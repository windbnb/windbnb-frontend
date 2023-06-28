<template>
  <div>
    <Table>
      <TableHead
        :columnNames="['Name','Start date', 'End date', 'Guest number', 'Status']"></TableHead>
      <TableBody>
        <TableRow
          v-for="reservation in reservations"
          :key="reservation.id"
          :values="[reservation.accommodationName, formatDateTime(reservation.startDate), formatDateTime(reservation.endDate), reservation.guestNumber, reservation.status]"
        >
        <div class="pull-right text-gray">
            <DropDownMenu v-if="reservation.status === 'SUBMITTED' && role.includes('GUEST')">
                <DropDownItem @click="deleteReservation(reservation)">Delete</DropDownItem>
            </DropDownMenu>

            <DropDownMenu v-if="reservation.status === 'ACCEPTED' && role.includes('GUEST')">
              <DropDownItem @click="cancelReservation(reservation) && reservation.startDate < Date.now()">
                  Cancel
                </DropDownItem>
              <ModalOpener :modalBoxId="'displayRateHostModal'">
                <DropDownItem @click="selected = reservation">Rate host</DropDownItem>
              </ModalOpener>
              <ModalOpener :modalBoxId="'displayRateAccomodationModal'">
                <DropDownItem @click="selected = reservation">Rate accomodation</DropDownItem>
              </ModalOpener>
            </DropDownMenu>

            <DropDownMenu v-if="reservation.status === 'SUBMITTED' && role.includes('HOST')">
              <DropDownItem @click="acceptReservation(reservation)">Accept</DropDownItem>
            </DropDownMenu>
        </div>
        </TableRow>
      </TableBody>
    </Table>
      <Modal modalBoxId="displayRateAccomodationModal" title="Rate" :sizeClass="'modal-sg'">
          <div slot="body">
            <StarRating  v-model="ratingAccomodation" @rating-selected="rateAccomodation()"></StarRating>
        </div>
    </Modal>

    <Modal  modalBoxId="displayRateHostModal" title="Rate" :sizeClass="'modal-sg'">
          <div slot="body">
            <StarRating v-model="ratingHost" @rating-selected="rateHost()"></StarRating>
        </div>
    </Modal>
  </div>
</template>

<script>
import Table from "../../generic-components/Table/Table.vue";
import TableHead from "../../generic-components/Table/TableHead.vue";
import TableBody from "../../generic-components/Table/TableBody.vue";
import TableRow from "../../generic-components/Table/TableRow.vue";
import DropDownMenu from '../../generic-components/DropdownMenu/DropdownMenu.vue'
import DropDownItem from '../../generic-components/DropdownMenu/DropdownItem.vue';
import ModalOpener from "../../generic-components/Modal/ModalOpener.vue"
import Modal from "../../generic-components/Modal/Modal.vue"
// import Rate from "../../generic-components/Rate/Rate.vue"
import StarRating from 'vue-star-rating'
import toastr from 'toastr'
import { mapActions, mapGetters } from 'vuex'
import {getRoleFromToken, getIdFromToken} from '../../utils/token.js'

export default {
  props: ['reservations'],
  data: () => {
    return {
      role: getRoleFromToken(),
      ratingAccomodation: 0,
      ratingHost:0,
      selected: null,
      hostId: null
    };
  },

  components: {
    Table,
    TableHead,
    TableBody,
    TableRow,
    DropDownMenu,
    DropDownItem,
    ModalOpener,
    Modal,
    // Rate,
    StarRating
  },

  watch: {
       result({ok, message, label}) {
        if(!ok) {
            toastr.error(message)
        }
        else {
            toastr.success(message)
        }
    },

    accomodation(newAccomodation){
      this.hostId = newAccomodation.userID;
      console.log(this.hostId)
    }


  },

  computed: {
        ...mapGetters({
          result: 'reservation/getResult',
          accomodation: 'accomodation/getAccomodation'
        })
    },
  methods: {
    ...mapActions({
        acceptReservationRequest:  'reservation/acceptReservationRequest',
        cancelReservationRequest: 'reservation/cancelReservation',
        deleteReservationRequest: 'reservation/deleteReservationRequest',
        createAccomodationReview: 'review/createAccomodationReview',
        createHostReview: 'review/createHostReview',
        fetchAccomodation: 'accomodation/fetchAccomodation'
        }),
    deleteReservation(reservation) {
      this.deleteReservationRequest(reservation.id)
      this.reservations = this.reservations.filter(r => r.id != reservation.id)
    },
    acceptReservation(reservation) {
      this.acceptReservationRequest(reservation.id)
      reservation.status = "ACCEPTED";
    },
    cancelReservation(reservation) {
      this.cancelReservationRequest(reservation.id)
      reservation.status = "CANCELLED";
    },

    rateHost(){
      this.fetchAccomodation(this.selected.accommodationID);
      console.log(this.hostId)
      //  var reviewDTO = {
      //   "GuestId":        getIdFromToken(),
	    //   "HostId": this.selected.accommodationID,
	    //   "Raiting":      this.ratingAccomodation
      // }
      // this.createHostReview(reviewDTO);
    },

    rateAccomodation(){
      var reviewDTO = {
        "GuestId":        getIdFromToken(),
	      "AccomodationId": this.selected.accommodationID,
	      "Raiting":      this.ratingAccomodation
      }
      this.createAccomodationReview(reviewDTO);
    },

    formatDateTime(date) {
      return moment(date).format("DD.MM.YYYY.");
    },
  },
  mounted() {
    this.role = getRoleFromToken()
  }
};
</script>
<template>
  <div>
    <Table>
      <TableHead
        :columnNames="['Name','Start date', 'End date', 'Guest number', 'Status']"></TableHead>
      <TableBody>
        <TableRow
          v-for="reservation in reservations"
          :key="reservation.id"
          :values="[reservation.accommodationName, reservation.startDate, reservation.endDate, reservation.guestNumber, reservation.status]"
        >
        <div class="pull-right text-gray">
            <DropDownMenu v-if="reservation.status === 'SUBMITTED' && role.includes('GUEST')">
                <DropDownItem @click="deleteReservation(reservation)">Delete</DropDownItem>
            </DropDownMenu>

            <DropDownMenu v-if="reservation.status === 'ACCEPTED' && role.includes('GUEST')">
              <DropDownItem @click="cancelReservation(reservation) && reservation.startDate < Date.now()">
                  Cancel
                </DropDownItem>
            </DropDownMenu>

            <DropDownMenu v-if="reservation.status === 'SUBMITTED' && role.includes('HOST')">
              <DropDownItem @click="acceptReservation(reservation)">Accept</DropDownItem>
            </DropDownMenu>
        </div>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script>
import Table from "../../generic-components/Table/Table.vue";
import TableHead from "../../generic-components/Table/TableHead.vue";
import TableBody from "../../generic-components/Table/TableBody.vue";
import TableRow from "../../generic-components/Table/TableRow.vue";
import DropDownMenu from '../../generic-components/DropdownMenu/DropdownMenu.vue'
import DropDownItem from '../../generic-components/DropdownMenu/DropdownItem.vue';
import toastr from 'toastr'
import { mapActions, mapGetters } from 'vuex'
import {getRoleFromToken} from '../../utils/token.js'

export default {
  props: ['reservations'],
  data: () => {
    return {
      role: getRoleFromToken()
    };
  },

  components: {
    Table,
    TableHead,
    TableBody,
    TableRow,
    DropDownMenu,
    DropDownItem
  },

  watch: {
       result({ok, message, label}) {
        if(!ok) {
            toastr.error(message)
        }
        else {
            toastr.success(message)
        }
    }
  },

  computed: {
        ...mapGetters({
        })
    },
  methods: {
    ...mapActions({
        acceptReservationRequest:  'reservation/acceptReservationRequest',
        cancelReservationRequest: 'reservation/cancelReservation',
        deleteReservationRequest: 'reservation/deleteReservationRequest'
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
    }
  },
  mounted() {
    this.role = getRoleFromToken()
  }
};
</script>

<template>
    <div>
        <Modal modalBoxId="displayCreateReservationRequestModal" title="Create reservation request" :sizeClass="'modal-sg'">
            <div slot="body" :v-if="accomodation">
                <p class="card-title">Address: {{this.accomodation.accomodation.address}}</p>
                <p class="card-title">Date: {{formatDate(this.accomodation.startDate)}} - {{formatDate(this.accomodation.endDate)}}</p>
                <p class="card-title">Number of guests: {{this.accomodation.numberOfGuests}}</p>
                <p class="card-title">Price: {{this.accomodation.price}} RSD</p>
                <Button class="pull-right" @click="clickReserve">Reserve</Button>
            </div>
            
            <ModalCloser id="displayCreateReservationRequestModal"></ModalCloser>
        </Modal>

        <ModalOpener id="displayCreateReservationRequestModalOpener" class="d-none" modalBoxId="displayCreateReservationRequestModal" />
    </div>
</template>

<script>
import Modal from '../../generic-components/Modal/Modal.vue'
import ModalOpener from '../../generic-components/Modal/ModalOpener.vue'
import ModalCloser from '../../generic-components/Modal/ModalCloser.vue'
import Button from "../../generic-components/Form/Button.vue"
import { getIdFromToken } from '../../utils/token'
import {mapActions, mapGetters} from 'vuex'
import toastr from 'toastr'

export default {
    props: ['accomodation'],
    components: {
        Modal,
        ModalOpener,
        ModalCloser,
        Button
    },
    data: function() {
        return {
        }
    },
    computed: {
        ...mapGetters({
            result: 'reservation/getResult',
            getReservations: 'reservation/getReservations'
        })
    },

    watch: {
       result({ok, message, label}) {
        console.log("EVO ME")
        if (label !== "createReservations") {
            return;
        }

        if(!ok) {
            toastr.error(message)
        }
        else {
            toastr.success(message)
        }
    }
  },

    methods: {
        formatDate(date) {
            return moment(date).format("DD.MM.YYYY.");
        },

        ...mapActions({
            createReservationRequest: 'reservation/createReservationRequest'
        }),

        clickReserve() {
            let numberOfDays = (new Date(this.accomodation.endDate) - new Date(this.accomodation.startDate)) / (1000 * 3600 * 24)

            let reservationRequest = {
                AccommodationID: this.accomodation.accomodation.id,
                StartDate: this.accomodation.startDate,
                NumberOfDays: Math.ceil(numberOfDays),
                GuestID: getIdFromToken(),
                GuestNumber: this.accomodation.numberOfGuests
            }

            this.createReservationRequest(reservationRequest);
        }

    },
    mounted()
    {
    },
}
</script>
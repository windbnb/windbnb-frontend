<template>
  <div class="content">
    <div class="container-fluid">
      <div class="center align-items-center col-10" style="margin-left: 10%">
        <card :title="'Active reservations'">
            <ReservationTable :reservations="reservations"/>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../generic-components/Card/Card.vue";
import ReservationTable from "../custom-components/Table/ReservationTable.vue";
import { mapActions, mapGetters } from "vuex";
import { getIdFromToken } from '../utils/token';

export default {
  components: {
    Card,
    ReservationTable
  },
    data: () => {
        return {
            reservations: []
        };
    },
    computed: {
        ...mapGetters({
            result: 'reservation/getResult',
            getReservations: 'reservation/getReservations'
        })
    },
    methods: {
        ...mapActions({
            getGuestActive: 'reservation/getGuestActive'
        }),
    },
    watch: {
       getReservations(reservations) {
        this.reservations = reservations;
       }
    },
    mounted() {
        this.getGuestActive(getIdFromToken());
    },
    name: "GuestActiveReservationsPage",
};
</script>
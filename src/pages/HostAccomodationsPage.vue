<template>
    <div class="content">
        <div class="container-fluid" v-if="accomodations !== null">
            <div v-for="(accomodation, index) in accomodations" :key="index" >
                <div class="row">
                    <div class="col-md-12 ml-auto mr-auto">
                       <BasicAccomodationCard :fetchedAccomodation="accomodation"></BasicAccomodationCard>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import BasicAccomodationCard from "../custom-components/Card/BasicAccomodationCard.vue";
import { mapGetters, mapActions } from 'vuex'
import {getIdFromToken} from "../utils/token.js"

export default {
    components: {
        BasicAccomodationCard
    },
    name: "HostAccomodationsPage",
     data: function() {
        return {
            accomodations: null
        }
    },
    computed: {
        ...mapGetters({
            fetchedAccomodations: "accomodation/getAccomodations",
        }),
    },
    watch: {
        fetchedAccomodations(newAccomodations) {
            this.accomodations = newAccomodations
    },
},

  methods: {
      ...mapActions({
        fetchAccomodations: "accomodation/fetchAccomodationsForHost"
    }),
   
  },


  mounted() {
     this.fetchAccomodations(getIdFromToken())
},
};
</script>

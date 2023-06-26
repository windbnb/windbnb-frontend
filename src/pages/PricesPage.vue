<template>
  <div class="content">
   <div class="container-fluid">
        <Card :title="'Prices'">
            <PricesTable :prices="prices" :accomodationId="accomodationId"></PricesTable>
        </Card>
      </div>
  </div> 
</template>

<script>
import Card from "../generic-components/Card/Card.vue";
import PricesTable from "../custom-components/Table/PricesTable.vue"
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    Card,
    PricesTable
  },
  name: "PricesPage",
  data: function() {
    return {
      prices: null,
      accomodationId: null
    }
  },
  computed: {
    ...mapGetters({
      fetchedPrices: 'accomodation/getPrices'
    }),
  },

  watch: {
    fetchedPrices(newPrices){
      this.prices = newPrices;
    }
  },

  methods: {
     ...mapActions({getPricesForAccomodation: 'accomodation/fetchPricesForAccomodation'}),
  },

  mounted()
  {
    this.accomodationId = this.$route.params.id;
    this.getPricesForAccomodation(this.accomodationId)
  }
}
</script>
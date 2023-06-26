<template>
  <div class="content">
    <div class="container-fluid">
      <div class="center align-items-center col-10" style="margin-left: 10%">
        <card :title="'Available terms'">
            <AvailableTermTable :availableTerms="availableTerms" :accomodationId="accomodationId"></AvailableTermTable>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../generic-components/Card/Card.vue";
import AvailableTermTable from "../custom-components/Table/AvailableTermTable.vue"
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    Card,
    AvailableTermTable
  },
  name: "AvailableTermsPage",
  data: function() {
    return {
      availableTerms: null,
      accomodationId: null
    }
  },
  computed: {
    ...mapGetters({
      fetchedAvailableTerms: 'accomodation/getAvailableTerms'
    }),
  },

  watch: {
    fetchedAvailableTerms(newAvailableTerms){
      this.availableTerms = newAvailableTerms;
    }
  },

  methods: {
     ...mapActions({getAvailableTermsForAccomodation: 'accomodation/fetchAvailableTermsForAccomodation'}),
  },

  mounted()
  {
    this.accomodationId = this.$route.params.id;
    this.getAvailableTermsForAccomodation(this.accomodationId)
  }
}
</script>
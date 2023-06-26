<template>
    <div class="content">
        <div class="container-fluid">
            <Form @submit="onSubmit($event)">
                <form-row>
                    <div class="col-3">
                        <text-input label="Location" v-model="searchAccomodation.address" type="text"/>
                    </div>
                     <div class="col-3">
                        <text-input label="Number of guests" min="1" v-model="searchAccomodation.numberOfGuests" type="number"
                        :isValid="validateStringWithNumbersOnly(searchAccomodation.numberOfGuests)" :showErrorMessage="showErrorMessage" errorMessage="Can contain only numbers."/>
                    </div>
                    <div class="col-3">
                        <DateTimePicker v-model="searchAccomodation.startDate" :isValid="!!searchAccomodation.startDate" 
                        :showErrorMessage="showErrorMessage" label="Start date" errorMessage="You have to select start date."
                        type="date" id="startValidDate"/>
                    </div>
                    <div class="col-3">
                        <DateTimePicker  v-model="searchAccomodation.endDate" :isValid="!!searchAccomodation.endDate"  :showErrorMessage="showErrorMessage" label="End date" errorMessage="You have to select end date."
                        type="date" id="endValidDate"/>
                    </div>
                </form-row>
                <Button @click="showErrorMessage = true" type="submit">Search</Button>
            </Form>

             <div class="container-fluid" v-if="accomodations.length >0">
              <div v-for="(accomodation, index) in accomodations" :key="index" >
                <div class="row">
                    <div class="col-md-12 ml-auto mr-auto">
                       <AccomodationCard :fetchedAccomodation="accomodation"></AccomodationCard>
                    </div>
                </div>
            </div>
        </div>
        </div> 
    </div>
</template>


<script>
import Button from "../../generic-components/Form/Button.vue";
import Form from "../../generic-components/Form/Form.vue";
import FormRow from "../../generic-components/Form/FormRow.vue";
import TextInput from "../../generic-components/Form/TextInput.vue";
import DateTimePicker from "../../generic-components/Form/DateTimePicker.vue"
import AccomodationCard from "../../custom-components/Card/AccomodationCard.vue"
import { validateStringWithLettersOnly, validateStringWithNumbersOnly } from '../../utils/validation'
import {mapGetters, mapActions} from 'vuex'
export default {
  components: {
    Form,
    FormRow,
    TextInput,
    Button,
    DateTimePicker,
    AccomodationCard
  },

data: function () {
    return {
      searchAccomodation: {
        numberOfGuests: 1,
        address: "",
        startDate: "",
        endDate: "",
      },
      showErrorMessage: false,
      accomodations: []
    };
},

computed: {
     ...mapGetters({
        fetchAccomodations: "accomodation/getAccomodations"
    }),
},

watch: {
    fetchAccomodations(newAccomodations){
        this.accomodations = newAccomodations;
    }
},

methods: {
     ...mapActions({
      searchAccomodations: "accomodation/searchAccomodations"
    }),

    onSubmit(e) {
      e.preventDefault();
      this.searchAccomodation.numberOfGuests = parseInt(this.searchAccomodation.numberOfGuests)
      this.searchAccomodations(this.searchAccomodation);
    },
    
    validateStringWithLettersOnly(name) {
      return validateStringWithLettersOnly(name);
    },

    validateStringWithNumbersOnly(number) {
      return validateStringWithNumbersOnly(number);
    },

  },

  mounted() {},
};
</script>
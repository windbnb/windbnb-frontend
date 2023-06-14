<template>
  <Form @submit="onSubmit($event)">
        <form-row>
            <div class="col-6">
                <text-input label="Name" v-model="newAccomodation.name" type="text" :isValid="validateStringWithLettersOnly(newAccomodation.name)"
                :showErrorMessage="showErrorMessage" errorMessage="Name can only contain letters."/>
            </div>
             <div class="col-6">
                <text-input label="Address" v-model="newAccomodation.address" type="text"/>
            </div>
        </form-row>

        <form-row>
            <MultiSelectOptionInputVue label="Facilities" class="col-6" :showLabel="true" :options="additional" v-model="facilities"/>
            <SelectOptionInput label="Price type" class="col-6" :showLabel="true" :options="types" v-model="priceType"/>
        </form-row>

        <form-row>
          <div class="col-6">
                <text-input label="Minimum number of guests" min="1" v-model="newAccomodation.minimumGuests" type="number"
                :isValid="validateStringWithNumbersOnly(newAccomodation.minimumGuests)" :showErrorMessage="showErrorMessage" errorMessage="Can contain only numbers."/>
            </div>
            <div class="col-6">
                <text-input label="Maximm number of guests" v-model="newAccomodation.maximumGuests" type="number"
                 :isValid="validateStringWithNumbersOnly(newAccomodation.maximumGuests)" :showErrorMessage="showErrorMessage" errorMessage="Can contain only numbers."/>
            </div>
        </form-row>
        <form-row>
          <div class="col-6">
            <input class="btn btn-primary"  @change="fileSelected" type="file" multiple>
          </div>
        </form-row>
        <form-row>
          <div class="col-12" v-if="selected === true">
           <div style=" float: left; width: 25%;" v-for="image in images" :key="image.name">
              <img v-bind:src="image" style="height: 100px;width: 200px;">
           </div>
          </div>
        </form-row>
    <Button @click="showErrorMessage = true" type="submit">Add</Button>
  </Form>
</template>

<script>
import Button from "../../generic-components/Form/Button.vue";
import Form from "../../generic-components/Form/Form.vue";
import FormRow from "../../generic-components/Form/FormRow.vue";
import TextInput from "../../generic-components/Form/TextInput.vue";
import SelectOptionInput from "../../generic-components/Form/SelectOptionInput.vue";
import MultiSelectOptionInputVue from "../../generic-components/Form/MultiSelectOptionInput.vue"
import { validateStringWithLettersOnly, validateStringWithNumbersOnly } from '../../utils/validation'
import {mapGetters, mapActions} from 'vuex'
import {getIdFromToken} from '../../utils/token.js'
import toastr from 'toastr'

export default {
  components: {
    Form,
    FormRow,
    TextInput,
    Button,
    SelectOptionInput,
    MultiSelectOptionInputVue
  },

data: function () {
    return {
      types: [
        {
          label: "PER GUEST",
          value: "PER_GUEST",
        },
        {
          label: "PER ACCOMODATION UNIT",
          value: "PER_ACCOMODATION_UNIT",
        },
      ],
      additional: [
        {
          label: "WIFI",
          value: "WIFI",
        },
        {
          label: "KITCHEN",
          value: "KITCHEN",
        },
        {
          label: "AIR CONDITIONING",
          value: "AIR_CONDITIONING",
        },
        {
          label: "FREE PARKING",
          value: "FREE_PARKING",
        },


      ],
      newAccomodation: {
        name: "",
        minimumGuests: 1,
        maximumGuests: 1,
        address: "",
        priceType: "",
        hasWifi: false,
        hasKitchen: false,
        hasAirConditioning: false,
        hasFreeParking: false
      },
      priceType : {},
      facilities: [],
      showErrorMessage: false,
      images: [],
      sendImages:null,
      selected : false
    };
},

computed: {
     ...mapGetters({
        result: "accomodation/getResult",
        accomodation: "accomodation/getAccomodation"
    }),
},

watch: {
   result({ message, ok, label }) {
      if (label === "create") {
        if (ok) {
            toastr.success(message);
            this.$router.push('/accomodation-availability/'+ this.accomodation.id);
        } else {
            toastr.error(message);
        }
      }
    },
},

methods: {
     ...mapActions({
      createAccomodation: "accomodation/createAccomodation"
    }),

    onSubmit(e) {
      e.preventDefault();
      if(this.facilities.includes('WIFI')){
        this.newAccomodation.hasWifi = true;
      }
      if(this.facilities.includes('KITCHEN')){
        this.newAccomodation.hasKitchen = true;
      }
      if(this.facilities.includes('AIR_CONDITIONING')){
        this.newAccomodation.hasAirConditioning = true;
      }
      if(this.facilities.includes('FREE_PARKING')){
        this.newAccomodation.hasFreeParking = true;
      }
      this.newAccomodation.priceType = this.priceType;
      const formData = new FormData();
      formData.append('name', this.newAccomodation.name);
      formData.append('address', this.newAccomodation.address);
      formData.append('hasWifi', this.newAccomodation.hasWifi);
      formData.append('hasKitchen', this.newAccomodation.hasKitchen);
      formData.append('hasAirConditioning', this.newAccomodation.hasAirConditioning);
      formData.append('hasFreeParking', this.newAccomodation.hasFreeParking);
      formData.append('minimumGuests', this.newAccomodation.minimumGuests);
      formData.append('maximumGuests', this.newAccomodation.maximumGuests);
      formData.append('priceType', this.newAccomodation.priceType);
      formData.append('userId', getIdFromToken())
      for (let i = 0; i < this.sendImages.length; i++) {
       formData.append('images', this.sendImages[i]);
      }
      this.createAccomodation(formData);
    },
    
    validateStringWithLettersOnly(name) {
      return validateStringWithLettersOnly(name);
    },

    validateStringWithNumbersOnly(number) {
      return validateStringWithNumbersOnly(number);
    },
    
    fileSelected(event){
      this.selected = true;
      let reader = new FileReader();
      reader.onload = (e) => {
        var imageFile = e.target.result;
        this.images.push(imageFile);
      };
      this.sendImages = event.target.files;
        //reader.readAsDataURL(event.target.files[0]);
    },

  },

  mounted() {},
};
</script>
<template>
    <div class="content">
        <div class="container-fluid">
            <div class="center align-items-center col-10" style="margin-left: 10%">
                <card :title="this.accomodation.accomodation.name">
                    <div class="card-body">
                        <h4 class="card-title">Address: {{this.accomodation.accomodation.address}}</h4>
                        <p class="card-title">Date: {{formatDate(this.accomodation.startDate)}} - {{formatDate(this.accomodation.endDate)}}</p>
                        <p class="card-title">Number of guests: {{this.accomodation.numberOfGuests}}</p>
                        <p class="card-title">{{checkPriceType()}}</p>
                        <p class="card-title">Price: {{this.accomodation.price}} RSD</p>
                        <p class="card-title">{{facilities()}}</p>
                        <StarRating  v-model="this.accomodation.average" :read-only=true  :star-size="15"></StarRating>
                        <div class="stats">
                    
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="stats">
                            <div class="card-title"><b>Total price: {{this.accomodation.totalPrice}} RSD</b></div>
                        </div>
                        <Button :v-if="role.includes('GUEST')" class="pull-right" @click="clickReserve">Reserve</Button>
                    </div>
                    <ul :v-if="done" v-for="img in displayImages" :key="img">
                        <li><img  :src="img" id="image" style="height: 200px;max-width: 100%;"/></li>
                    </ul>
                    <CreateReservationRequestModal :accomodation="this.accomodation" />
                </card>
            </div>
        </div>
    </div>

</template>

<script>
import Card from "../generic-components/Card/Card.vue";
import Button from "../generic-components/Form/Button.vue"
import Form from "../generic-components/Form/Form.vue"
import FormRow from "../generic-components/Form/FormRow.vue";
import TextInput from "../generic-components/Form/TextInput.vue";
import StarRating from 'vue-star-rating'
import CreateReservationRequestModal from "../custom-components/Modal/CreateReservationRequestModal.vue"
import { getRoleFromToken } from '../utils/token';
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Card,
    Button,
    Form,
    FormRow,
    TextInput,
    StarRating,
    CreateReservationRequestModal
  },
  props: {
    accomodation: {}
  },
  name: "AccomodationPage",
  data: function() {
        return {
            role: getRoleFromToken(),
            images:[],
            displayImages: [],
            done: false
        }
  },
 computed: {
    ...mapGetters({
            fetchedImage: "accomodation/getImage"
        }),
},
 watch: {
    fetchedImage(newImage) {
        this.image = newImage.image;
        this.displayImages.push(newImage.image);
        if(this.displayImages.length ===this.images ){
            this.done = true;
        }
    },
},
  methods: {
      ...mapActions({
        fetchImage: "accomodation/fetchImage"
    }),
    formatDate(date) {
      return moment(date).format("DD.MM.YYYY.");
    },

    checkPriceType(){
        if(this.accomodation.accomodation.priceType === 'PER_ACCOMODATION_UNIT'){
            return "Price type: PER ACCOMODATION UNIT"
        }else if(this.accomodation.accomodation.priceType === 'PER_GUEST'){
            return "Price type: PER GUEST"
        }
    },

    facilities(){
        var additional = "";
        if(this.accomodation.accomodation.hasWifi === true){
            additional += " WIFI"
        }
        if(this.accomodation.accomodation.hasAirConditioning === true){
            additional += " AIR CONDITIONING"
        }
        if(this.accomodation.accomodation.hasKitchen === true){
            additional += " KITCHEN"
        }
         if(this.accomodation.accomodation.hasFreeParking === true){
            additional += " FREE PARKING"
        }
        return additional
    },

    clickReserve() {
        document.getElementById('displayCreateReservationRequestModalOpener').click();
    }
  },


  mounted() {
    if(this.accomodation !== null){
        this.images = this.accomodation.accomodation.images
        for(var i =0; i<this.images.length; i++){
            this.fetchImage(this.images[i])
        }
    }
    },
};
</script>
<style scoped>
    ul {
        white-space: nowrap;
    }

    ul, li {
        list-style: none;
        display: inline;
    }
</style>
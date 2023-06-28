<template>
 <div>
        <div class="card card-chart" v-if="this.image !== null">
            <div class="card-header card-header-rose">
                <img :src="image" id="image" style="height: 200px;max-width: 100%;"/>
            </div>
            <div class="card-body">
                <h4 class="card-title">{{fetchedAccomodation.name}}</h4>
                <p class="card-title">{{fetchedAccomodation.address}}</p>
                <StarRating :rating="averageRate" :read-only=true></StarRating>
            </div>
            <div class="card-footer">
                <Button  @click="viewAvailableTerms">Available terms</Button>
                <Button  @click="viewPrices">Prices</Button>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "../../generic-components/Form/Button.vue"
import StarRating from 'vue-star-rating'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        Button,
        StarRating
    },

    props:{
        fetchedAccomodation: {}
    },

data: function () {
    return {
      image: null,
      averageRate: 0
    };
},
computed: {
    ...mapGetters({
        fetchedImage: "accomodation/getImage",
        averageAccomodation: "review/getAverageAccomodation"
    }),
    },

watch: {
    fetchedImage(newImage) {
        this.image = newImage.image;
        this.fetchedAccomodation.displayImage = newImage.image;
    },

    averageAccomodation(newAverageAccomodation){
        this.fetchedAccomodation.average = newAverageAccomodation.AverageRaiting;
        this.averageRate = newAverageAccomodation.AverageRaiting;
    }
},

methods: {
        ...mapActions({
        fetchImage: "accomodation/fetchImage",
        fetchAverageAccomodation: "review/fetchAverageAccomodation"
    }),

    load(){
        URL.revokeObjectURL(this.image);
        document.getElementById('image').src = this.image;
        console.log(this.image)
    },

    viewAvailableTerms(){
       this.$router.push('/available-terms/'+ this.fetchedAccomodation.id);
    },

    viewPrices(){
        this.$router.push('/prices/'+ this.fetchedAccomodation.id);
    }
},

mounted() {
    this.fetchedAccomodationData = this.fetchedAccomodation;
    this.fetchImage(this.fetchedAccomodation.images[0])
    this.fetchAverageAccomodation(this.fetchedAccomodation.id)
},

}

</script>

<template>
 <div>
        <div class="card card-chart" v-if="fetchedAccomodationData.displayImage !== null  && fetchedAccomodationData.average !== 0">
            <div class="card-header card-header">
                <img :src="fetchedAccomodationData.displayImage" id="image" @load="load" style="height: 200px;max-width: 100%;"/>
            </div>
            <div class="card-body">
                <!-- <h4 class="card-title">{{fetchedAccomodationData}}</h4> -->
                <p class="card-title">{{fetchedAccomodationData.accomodation.address}}</p>
               <p class="card-title">{{fetchedAccomodationData.average}}</p>
                <StarRating v-model="fetchedAccomodationData.average" :read-only=true></StarRating>
            </div>
            <div class="card-footer">
                <div class="stats">
                </div>
                <Button class="pull-right" @click="viewMore">View more</Button>
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
      fetchedAccomodationData: {
        accomodation: {
            address: ""
        }
      }
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
        this.fetchedAccomodationData.displayImage = newImage;
    },

    averageAccomodation(newAverageAccomodation){
        this.fetchedAccomodationData.average = newAverageAccomodation.AverageRaiting;
        this.$set(this, "fetchedAccomodationData", newAverageAccomodation)
        this.$set(this.fetchedAccomodationData, "average", newAverageAccomodation.AverageRaiting)
    }

},

methods: {
        ...mapActions({
        fetchImage: "accomodation/fetchImage",
        fetchAverageAccomodation: "review/fetchAverageAccomodation"
    }),

    load(){
        URL.revokeObjectURL(this.fetchedAccomodation.displayImage);
        document.getElementById('image').src = this.fetchedAccomodation.displayImage;
    },

    viewMore(){
        this.$router.push({name:'AccomodationPage', path: '/accomodation/'+ this.fetchedAccomodationData.accomodation.id, params: { accomodation: this.fetchedAccomodation }});
    }
},

mounted() {
    this.fetchedAccomodationData = this.fetchedAccomodation;
    this.fetchImage(this.fetchedAccomodationData.accomodation.images[0])
    this.fetchAverageAccomodation(this.fetchedAccomodationData.accomodation.id)
},

}

</script>

<template>
 <div>
        <div class="card card-chart">
            <div :v-if="image">
                <img :src="image" id="image" style="height: 200px;max-width: 100%;"/>

            </div>
            <div class="card-body" :v-if="fetchedAccomodation">
                <!-- <h4 class="card-title">{{fetchedAccomodationData}}</h4> -->
                <p class="card-title">{{fetchedAccomodation.accomodation.address}}</p>
               <p class="card-title">{{fetchedAccomodation.average}}</p>
                <StarRating :rating="averageRate" :read-only=true></StarRating>
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
        averageRate: 0
        }
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
            console.log(newAverageAccomodation)
            this.fetchedAccomodation.average = newAverageAccomodation.AverageRaiting;
            this.averageRate = newAverageAccomodation.AverageRaiting;
            // this.$set(this, "fetchedAccomodationData", newAverageAccomodation)
            // this.$set(this.fetchedAccomodationData, "average", newAverageAccomodation.AverageRaiting)
        }

    },

    methods: {
            ...mapActions({
            fetchImage: "accomodation/fetchImage",
            fetchAverageAccomodation: "review/fetchAverageAccomodation"
        }),

        load(){
            URL.revokeObjectURL(this.fetchedAccomodation.displayImage);
            document.getElementById('image').src = this.image;
        },

        viewMore(){
            this.$router.push({name:'AccomodationPage', path: '/accomodation/'+ this.fetchedAccomodationData.accomodation.id, params: { accomodation: this.fetchedAccomodation }});
        }
    },

    mounted() {
        this.fetchedAccomodationData = this.fetchedAccomodation;
        this.fetchImage(this.fetchedAccomodationData.accomodation.images[0])
        this.fetchAverageAccomodation(this.fetchedAccomodationData.accomodation.id)
    }
}

</script>
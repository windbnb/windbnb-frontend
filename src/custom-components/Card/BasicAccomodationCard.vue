<template>
 <div>
        <div class="card card-chart" v-if="this.image !== null">
            <div class="card-header card-header-rose">
                <img :src="this.image" id="image" @load="load()"/>
            </div>
            <div class="card-body">
                <h4 class="card-title">{{fetchedAccomodation.name}}</h4>
                <p class="card-title">{{fetchedAccomodation.address}}</p>
                 <p class="card-category">{{"RATING"}}</p>
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
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        Button,
    },

    props:{
        fetchedAccomodation: {}
    },

data: function () {
    return {
      image: null
    };
},
computed: {
    ...mapGetters({
      fetchedImage: "accomodation/getImage",
        }),
    },

watch: {
     fetchedImage(newImage) {
        this.image = window.URL.createObjectURL(newImage);
    },
},

methods: {
        ...mapActions({
        fetchImage: "accomodation/fetchImage"
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
    this.fetchImage(this.fetchedAccomodation.images[0])
},

}

</script>

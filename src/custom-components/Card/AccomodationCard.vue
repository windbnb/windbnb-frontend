<template>
 <div>
        <div class="card card-chart" v-if="this.image !== null">
            <div class="card-header card-header-rose">
                <img v-bind:src="dataUrl"/>
            </div>
            <div class="card-body">
                <h4 class="card-title">{{fetchedAccomodation.accomodation.name}}</h4>
                <p class="card-title">{{fetchedAccomodation.accomodation.address}}</p>
                 <p class="card-category">{{"RATING"}}</p>
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
      image: null,
      isLoaded : false
    };
},
computed: {
    ...mapGetters({
      fetchedImage: "accomodation/getImage",
        }),
    },

watch: {
     fetchedImage(newImage) {
        this.fetchedAccomodation.accomodation.imagePath = newImage;
        this.dataUrl()
    },
},

methods: {
        ...mapActions({
        fetchImage: "accomodation/fetchImage"
    }),
    
    dataUrl(){
     this.blob  = new Blob([this.fetchedAccomodation.accomodation.imagePath], {type: "image/jpg"});
     this.image = window.URL.createObjectURL(this.blob);
     console.log(this.image)
     return this.image
    },

    viewMore(){
         this.$router.push({name:'AccomodationPage', path: '/accomodation/'+ this.fetchedAccomodation.accomodation.id, params: { accomodation: this.fetchedAccomodation }});
    }
},

mounted() {
    this.fetchImage(this.fetchedAccomodation.accomodation.images[0])
},

}

</script>

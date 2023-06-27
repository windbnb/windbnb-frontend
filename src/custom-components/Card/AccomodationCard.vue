<template>
 <div>
        <div class="card card-chart" v-if="this.image !== null">
            <div class="card-header card-header-rose">
                <img :src="this.image" id="image" @load="load"/>
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

    viewMore(){
        this.$router.push({path: `/accomodation/${this.fetchedAccomodation.accomodation.id}`, params: { accomodation: this.fetchedAccomodation, id: this.fetchedAccomodation.accomodation.id }, name: "AccomodationPage"});
    }
},

mounted() {
    this.fetchImage(this.fetchedAccomodation.accomodation.images[0])
},

}

</script>

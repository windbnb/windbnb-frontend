<template>
    <div class="col-md-6 col-lg-6 col-sm-10">
        <card :title="'Profile'">
        <ProfileForm :user="fetchedUser"></ProfileForm>
        </card>
    </div>
</template>

<script>
import Card from '../generic-components/Card/Card.vue'
import ProfileForm from "../custom-components/Form/ProfileForm.vue"

import {mapGetters, mapActions} from 'vuex'
import { getIdFromToken } from '../utils/token'
export default {
    components: {
        Card,
        ProfileForm
    },
     data: function() {
        return {
            fetchedUser: null
        }
    },
    computed: {
           ...mapGetters({
             user: 'user/getUser'
           }),
         
    },

    watch: {
        user(newUser){
            this.fetchedUser = newUser;
        }
    },

    methods: {
         ...mapActions({fetchUser: 'user/fetchUser'}),
    },

    mounted()
    {
        this.fetchUser(getIdFromToken())
    }
}
</script>

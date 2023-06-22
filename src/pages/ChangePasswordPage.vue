<template>
    <div class="col-md-6 col-lg-6 col-sm-10">
        <card :title="'Change password'">
        <ChangePasswordForm :user="fetchedUser"></ChangePasswordForm>
        </card>
    </div>
</template>

<script>
import Card from '../generic-components/Card/Card.vue'
import ChangePasswordForm from "../custom-components/Form/ChangePasswordForm.vue"

import {mapGetters, mapActions} from 'vuex'
import { getIdFromToken } from '../utils/token'
export default {
    components: {
        Card,
        ChangePasswordForm
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

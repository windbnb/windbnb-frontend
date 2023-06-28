<template>
    <Form>
        <form-row>
            <div class="col-12">
                <text-input 
                    label="Email"
                    v-model="email"
                    type="text"
                />
            </div>
        </form-row>

        <form-row>
            <div class="col-12">
                <text-input 
                    label="Password"
                    v-model="password"
                    type="password"
                />
            </div>
        </form-row>

        <Button @click="handleLoginClick">Login</Button>

        <div class="row mt-4">
            <p class="text-left col-6">
                <router-link to="/registration">Register</router-link>
            </p>
        </div>
    </Form>
</template>

<script>

import Button from '../../generic-components/Form/Button.vue'
import Form from '../../generic-components/Form/Form.vue'
import FormRow from '../../generic-components/Form/FormRow.vue'
import TextInput from '../../generic-components/Form/TextInput.vue'
import { mapActions, mapGetters } from 'vuex'
import toastr from 'toastr'

export default {
   components: {
       Form,
       FormRow,
       TextInput,
       Button
    },

    data: function() {
        return {
            email: '',
            password: ''
        }
    },

    computed: {
        ...mapGetters({result: 'authentication/getResult'})
    },

    watch: {
        result({ok, message, label}) {
            if(label !== 'authenticate') 
                return;
            if(ok) {
                this.$router.push('/search');
            } else {
                toastr.error(message)
            }
        }
    },

    methods: {
        ...mapActions({authenticate: 'authentication/authenticate'}),

        handleLoginClick() {
            const authenticateObject = {
                email: this.email,
                password: this.password
            };

            this.authenticate(authenticateObject);
        }
    }
}

</script>

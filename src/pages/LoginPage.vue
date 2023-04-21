<template>
    <div class="col-md-6 col-lg-6 col-sm-10">
        <card :title="'Login'">
            <LoginForm />
        </card>
    </div>
</template>

<script>
import Card from '../generic-components/Card/Card.vue'
import LoginForm from '../custom-components/Form/LoginForm.vue'

export default {
    components: {
        Card,
        LoginForm
    }
}
</script>

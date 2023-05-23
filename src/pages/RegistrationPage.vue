<template>
    <div class="col-md-6 col-lg-6 col-sm-10">
        <card :title="'Registration'">
            <RegistrationForm />
        </card>
    </div>
</template>

<script>
import Card from "../generic-components/Card/Card.vue";
import RegistrationForm from "../custom-components/Form/RegistrationForm.vue"

export default {
  components: {
    Card,
    RegistrationForm
  },
  name: "RegistrationPage",
};
</script>
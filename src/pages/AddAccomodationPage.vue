<template>
  <div class="content">
    <div class="container-fluid">
      <div class="center align-items-center col-10" style="margin-left: 10%">
        <card :title="'Add new accomodation'">
            <AddAccomodationForm/>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../generic-components/Card/Card.vue";
import AddAccomodationForm from "../custom-components/Form/AddAccomodationForm.vue";

export default {
  components: {
    Card,
    AddAccomodationForm
  },
  name: "AddAccomodationPage",
};
</script>
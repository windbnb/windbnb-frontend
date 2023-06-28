<template>
  <div class="content">
    <div class="container-fluid">
      <div class="center align-items-center col-10" style="margin-left: 10%">
        <card :title="'Add availability terms'">
            <AddAvailabilityForm/>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../generic-components/Card/Card.vue";
import AddAvailabilityForm from "../custom-components/Form/AddAvailabilityForm.vue";

export default {
  components: {
    Card,
    AddAvailabilityForm
  },
  name: "AddAvailability",
};
</script>
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="center align-items-center col-10" style="margin-left: 10%">
        <card :title="'Add prices for accomodation'">
            <AddPriceForm/>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../generic-components/Card/Card.vue";
import AddPriceForm from "../custom-components/Form/AddPriceForm.vue";

export default {
  components: {
    Card,
    AddPriceForm
  },
  name: "AddPrice",
};
</script>
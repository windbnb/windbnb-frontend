<template>
  <div class="content">
    <div class="container-fluid">
      <div class="center align-items-center col-10" style="margin-left: 10%">
        <card :title="'WINDBNB'">
            <SearchForm></SearchForm>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../generic-components/Card/Card.vue";
import SearchForm from "../custom-components/Form/SearchForm.vue"

export default {
  components: {
    Card,
    SearchForm
  },
  name: "AccomodationsPage",
};
</script>
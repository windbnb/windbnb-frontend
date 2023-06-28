<template>
     <Form @submit="onSubmit($event)"> 
         <form-row v-if="!isSaved">
            <div class="col-6">
               <DateTimePicker v-model="price.startDate" :isValid="!!price.startDate" 
               :showErrorMessage="showErrorMessage" label="Start date" errorMessage="You have to select start date."
                type="date" id="startValidDate"/>
            </div>
            <div class="col-6">
               <DateTimePicker  v-model="price.endDate" :isValid="!!price.endDate"  :showErrorMessage="showErrorMessage" label="End date" errorMessage="You have to select end date."
                type="date" id="endValidDate"/>
            </div>
        </form-row>
        <form-row>
            <SelectOptionInput class="col-6" :showLabel="true" label="Price duration" :options="durations" v-model="duration"/>
            <div class="col-6">
               <TextInput  v-model="price.value"  label="Value" type="number" :isValid="price.value > 0"
                :showErrorMessage="showErrorMessage" errorMessage="Value need to be positive." />
            </div>
        </form-row>
         <form-row v-if="!isSaved">
            <div class="col-6">
                <Button style="margin-top:4%" @click="showErrorMessage = true" type="submit">Add</Button>
            </div>
        </form-row>
        <form-row>
            <div class="col-12">
                <br>
            </div>
        </form-row>
        <form-row v-if="added == true">
            <div class="col-12">
                <Table>
                    <TableHead
                        :columnNames="['Start date','End date', 'Price duration', 'Price value']"
                    ></TableHead>
                    <TableBody>
                        <TableRow
                        v-for="price in prices"
                        :key="price.id"
                        :values="[formatDate(price.startDate), formatDate(price.endDate), price.priceDuration, price.value]"
                        >
                        <div class="pull-right text-gray">
                            <Button @click="onDeletePrice(price)">Delete</Button>
                        </div>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </form-row>

        <Button v-if="!isSaved" @click="handleSaveClick">Add prices</Button>
    </Form>

</template>

<script>
import Button from "../../generic-components/Form/Button.vue";
import Form from "../../generic-components/Form/Form.vue";
import FormRow from "../../generic-components/Form/FormRow.vue";
import DateTimePicker from "../../generic-components/Form/DateTimePicker.vue"
import Table from "../../generic-components/Table/Table.vue";
import TableHead from "../../generic-components/Table/TableHead.vue";
import TableBody from "../../generic-components/Table/TableBody.vue";
import TableRow from "../../generic-components/Table/TableRow.vue";
import SelectOptionInput from "../../generic-components/Form/SelectOptionInput.vue"
import TextInput from "../../generic-components/Form/TextInput.vue"
import toastr from 'toastr'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  components: {
    Form,
    FormRow,
    Button,
    DateTimePicker,
    Table,
    TableHead,
    TableBody,
    TableRow,
    SelectOptionInput,
    TextInput
  },

data: function () {
    return {
        durations: [
        {
          label: "REGULAR",
          value: "REGULAR",
        },
        {
          label: "HOLIDAY",
          value: "HOLIDAY",
        },
        {
          label: "WEEKEND",
          value: "WEEKEND",
        }
        ],
        counter: 0,
        prices: [],
        price: {
            startDate: "",
            endDate: "",
            accomodationId: 0,
            value:0,
            priceDuration:"",
            id:0
        },
        showErrorMessage: false,
        isSaved: false,
        added: false,
        duration: "REGULAR",
        
    };
},

computed: {
    ...mapGetters({
      result: "accomodation/getResult",
    }),
},

watch: {
    result({ message, ok, label }) {
      if (label === "create") {
        if (ok) {
            toastr.success(message);
        } else {
            toastr.error(message);
        }
      }
    },
},

methods: {
    ...mapActions({
      createPrices: "accomodation/createPrices"
    }),

    onSubmit(e) {
        e.preventDefault();
        this.counter += 1;
        this.price.id = this.counter;
        this.price.priceDuration = this.duration;
        this.prices.push(this.price);
        this.added = true;
        this.price = {};
    },

    onDeletePrice(deletePrice) {
        this.prices = this.prices.filter(price => price.id !== deletePrice.id);
    },

    handleSaveClick() {
        var newPrices = [];
         for (let i = 0; i < this.prices.length; i++) {
            var newPrice = {accomodationId: parseInt(this.$route.params.id),
                            startDate: this.prices[i].startDate, endDate: this.prices[i].endDate,
                            priceDuration: this.prices[i].priceDuration, value:  parseInt(this.prices[i].value) };
            newPrices.push(newPrice);
        }
        this.createPrices(newPrices);
        this.prices = {};
        this.added = false;
    },

    formatDate(date) {
      return moment(date).format("DD.MM.YYYY HH:mm");
    }
  },

  mounted() {},
};
</script>
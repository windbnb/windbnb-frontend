<template>
     <Form @submit="onSubmit($event)">
         <form-row v-if="!isSaved">
            <div class="col-6">
               <DateTimePicker v-model="availableTerm.startDate" :isValid="!!availableTerm.startDate" 
               :showErrorMessage="showErrorMessage" label="Start date" errorMessage="You have to select start date."
                type="date" id="startValidDate"/>
            </div>
            <div class="col-6">
               <DateTimePicker  v-model="availableTerm.endDate" :isValid="!!availableTerm.endDate"  :showErrorMessage="showErrorMessage" label="End date" errorMessage="You have to select end date."
                type="date" id="endValidDate"/>
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
        <form-row v-if="added === true">
            <div class="col-12">
                <Table>
                    <TableHead
                        :columnNames="['Start date','End date']"
                    ></TableHead>
                    <TableBody>
                        <TableRow
                        v-for="term in availableTerms"
                        :key="term.id"
                        :values="[formatDate(term.startDate), formatDate(term.endDate)]"
                        >
                        <div class="pull-right text-gray">
                            <Button @click="onDeleteTerm(term)">Delete</Button>
                        </div>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </form-row>

        <Button v-if="!isSaved" @click="handleSaveClick">Add available terms</Button>
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
    TableRow
  },

data: function () {
    return {
      counter: 0,
      availableTerms: [],
       availableTerm: {
        startDate: "",
        endDate: "",
        accomodationId: 0,
        id:0
      },
      showErrorMessage: false,
      isSaved: false,
      added: false,
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
      createAvailableTerms: "accomodation/createAvailableTerms"
    }),

    onSubmit(e) {
        e.preventDefault();
        this.counter += 1;
        this.availableTerm.id = this.counter;
        this.availableTerms.push(this.availableTerm);
        this.added = true;
        this.availableTerm = {};
    },

    onDeleteTerm(availableTerm) {
        this.availableTerms = this.availableTerms.filter(term => term.id !== availableTerm.id);
    },

    handleSaveClick() {
        var terms = [];
         for (let i = 0; i < this.availableTerms.length; i++) {
            var newTerm = {accomodationId: parseInt(this.$route.params.id),
                            startDate: this.availableTerms[i].startDate, endDate: this.availableTerms[i].endDate};
            terms.push(newTerm);
        }

        this.createAvailableTerms(terms);
        this.availableTerm = {};
        this.added = false;
        this.$router.push('/accomodation-price/' + this.$route.params.id);
    },

    formatDate(date) {
      return moment(date).format("DD.MM.YYYY HH:mm");
    }
  },

  mounted() {},
};
</script>
<template>
  <div>
    <Button class="pull-right" @click="addNewTerm">Add new term</Button>
    <Table v-if="availableTerms !== null ">
      <TableHead :columnNames="['Start date', 'End date', '']"></TableHead>
      <TableBody>
        <TableRow
          v-for="(availableTerm, i) in availableTerms"
          :key="i"
          :values="[formatDateTime(availableTerm.startDate), formatDateTime(availableTerm.endDate)]">
            <div class="pull-right text-gray">
            <DropDownMenu>
            <ModalOpener :modalBoxId="'displayDeleteModal'">
                <DropDownItem @click="onDelete(availableTerm.id)">Delete</DropDownItem>
            </ModalOpener>
            </DropDownMenu>
          </div>
        </TableRow>
      </TableBody>
    </Table>

  </div>
</template>

<script>
import Table from "../../generic-components/Table/Table.vue";
import TableHead from "../../generic-components/Table/TableHead.vue";
import TableBody from "../../generic-components/Table/TableBody.vue";
import TableRow from "../../generic-components/Table/TableRow.vue";
import DropDownItem from '../../generic-components/DropdownMenu/DropdownItem.vue'
import DropDownMenu from '../../generic-components/DropdownMenu/DropdownMenu.vue'
import Button from "../../generic-components/Form/Button.vue"
import Modal from '../../generic-components/Modal/Modal.vue'
import ModalOpener from '../../generic-components/Modal/ModalOpener.vue'
import moment from 'moment'
import {mapActions, mapGetters} from 'vuex'
import toastr from 'toastr'

export default {
  props: {
    availableTerms: {},
    accomodationId: null
  },
  data: () => {
    return {
        selectedAvailableTerm: null,
    };
  },
  components: {
    Table,
    TableHead,
    TableBody,
    TableRow,
    DropDownItem,
    DropDownMenu,
    Button,
    Modal,
    ModalOpener
  },

  computed: {
    ...mapGetters({
        result: 'accomodation/getResult',
        fetchedAvailableTerms: 'accomodation/getAvailableTerms'
    }),
  },
  watch: {

    result({ message, ok, label }) {
      if(label === "delete"){
        if(ok){
          toastr.success(message);
        }else {
          toastr.error(message);
        }
      }
    },

    fetchedAvailableTerms(newAvailableTerms){
        this.availableTerms = newAvailableTerms;
    }
  },
  methods: {
    ...mapActions({
      deleteAvailableTerm: "accomodation/deleteAvailableTerm"
    }),

    formatDateTime(date) {
        return moment(date).format("DD.MM.YYYY.");
    },

    addNewTerm(){
        this.$router.push("/accomodation-availability/" + this.accomodationId)
    },

    onDelete(id){
        this.deleteAvailableTerm(id);
    }
  },
  mounted() {}
};
</script>
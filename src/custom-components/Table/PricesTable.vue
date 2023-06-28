<template>
  <div>
    <Button class="pull-right" @click="addNewPrice">Add new price</Button>
    <Table v-if="prices !== null ">
      <TableHead :columnNames="['Start date', 'End date', 'Price type','Value', ' ']" ></TableHead>
      <TableBody>
        <TableRow
          v-for="(price, i) in prices"
          :key="i"
          :values="[formatDateTime(price.startDate), formatDateTime(price.endDate), price.priceDuration, price.value]">
            <div class="pull-right text-gray">
            <DropDownMenu>
               <ModalOpener :modalBoxId="'displayDeleteModal'">
                <DropDownItem @click="onDelete(price.id)">Delete</DropDownItem>
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
import Modal from '../../generic-components/Modal/Modal.vue'
import ModalOpener from '../../generic-components/Modal/ModalOpener.vue'
import Button from "../../generic-components/Form/Button.vue"
import moment from 'moment'
import {mapActions, mapGetters} from 'vuex'
import toastr from 'toastr'

export default {
  props: {
    prices: {},
  },
  data: () => {
    return {
        selectedPrice: null,
    };
  },
  components: {
    Table,
    TableHead,
    TableBody,
    TableRow,
    DropDownItem,
    DropDownMenu,
    Modal,
    ModalOpener,
    Button
  },

  computed: {
      ...mapGetters({
        result: 'accomodation/getResult',
        fetchedPrices: 'accomodation/getPrices'
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

  fetchedPrices(newPrices){
    this.prices = newPrices;
  }
  },
  methods: {
     ...mapActions({
      deletePrice: "accomodation/deletePrice"
    }),

    formatDateTime(date) {
      return moment(date).format("DD.MM.YYYY.");
    },

    onDelete(id){
      this.deletePrice(id);
    },
     addNewPrice(){
        this.$router.push("/accomodation-price/" + this.accomodationId)
    },
  },
  mounted() {
     
    }
};
</script>
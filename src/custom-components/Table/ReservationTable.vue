<template>
  <div>
    <Table>
      <TableHead
        :columnNames="['Name','Start date', 'End date', 'Guest number', 'Status']"></TableHead>
      <TableBody>
        <TableRow
          v-for="reservation in reservations"
          :key="reservation.id"
          :values="[reservation.accommodationName, reservation.startDate, reservation.endDate, reservation.guestNumber, reservation.status]"
        >
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
import DropDownMenu from '../../generic-components/DropdownMenu/DropdownMenu.vue'
import DropDownItem from '../../generic-components/DropdownMenu/DropdownItem.vue';
import toastr from 'toastr'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['reservations'],
  data: () => {
    return {
    };
  },

  components: {
    Table,
    TableHead,
    TableBody,
    TableRow,
    DropDownMenu,
    DropDownItem
  },

  watch: {
       
  },

  computed: {
        ...mapGetters({
        })
    },
  methods: {
    ...mapActions({
        }),
  },
  mounted() {
  }
};
</script>

<template>
  <div class="sidebar" data-color="purple" data-background-color="white">
    <sidebar-logo></sidebar-logo>
    <div class="sidebar-wrapper">
      <ul class="nav">
        <sidebar-item name="Home" icon="description" to="/"></sidebar-item>
        <sidebar-item v-if="role.includes('HOST')" name="Add accomodation" icon="add" to="/create-accomodation"></sidebar-item>
        <sidebar-item v-if="role.includes('HOST')" name="Active reservations" icon="list" to="/reservations/host-active"></sidebar-item>
        <sidebar-item v-if="role.includes('HOST')" name="Submitted reservations" icon="list" to="/reservations/host-submitted"></sidebar-item>
        <sidebar-item v-if="role.includes('HOST')" name="All reservations" icon="list" to="/reservations/host-all"></sidebar-item>

        <sidebar-item v-if="role.includes('GUEST')" name="Reservations" icon="list" to="/reservations/guest"></sidebar-item>
        <sidebar-item v-if="role.includes('GUEST')" name="Active reservations" icon="list" to="/reservations/guest-active"></sidebar-item>
      </ul>
    </div>
  </div>
</template>

<script>
import SidebarItem from "../../generic-components/Sidebar/SidebarItem.vue";
import SidebarLogo from "../../generic-components/Sidebar/SidebarLogo.vue";
import {getRoleFromToken} from '../../utils/token.js'

export default {
  data: () => {
    return {
      role: []
    };
  },
  mounted() {
    this.role = getRoleFromToken();
  },
  components: {
    SidebarLogo,
    SidebarItem,
  },
  methods: {},
};
</script>

<style></style>

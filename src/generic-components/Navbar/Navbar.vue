<template>
  <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
        <span class="sr-only">Toggle navigation</span>
        <span class="navbar-toggler-icon icon-bar"></span>
        <span class="navbar-toggler-icon icon-bar"></span>
        <span class="navbar-toggler-icon icon-bar"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <navbar-item>
            <router-link to="/">
              <icon name="Dashboard" icon="dashboard" />
            </router-link>
          </navbar-item>
          <navbar-item>
            <dropdown-menu name="Account" icon="person">
              <div>
                <dropdown-item to='/profile'>Profile</dropdown-item>
                 <dropdown-item to='/change'>Change password</dropdown-item>
                <dropdown-item  @click="logOut">Log out</dropdown-item>
              </div>
            </dropdown-menu>
          </navbar-item>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import DropdownItem from '../DropdownMenu/DropdownItem.vue'
import DropdownMenu from '../DropdownMenu/DropdownMenu.vue'
import Icon from '../Icon/Icon.vue'
import NavbarItem from './NavbarItem.vue'

export default {
  components: { DropdownMenu, DropdownItem, NavbarItem, Icon },


  data: function() {
    return {
      
    }
  },

  methods: {
    changeRoute(route) {
      this.$router.push(route);
    },

    logOut() {
      this.$store.dispatch('authentication/logOut');
      this.$router.push('/login');
    }
  },

  mounted() {
  
  }
}
</script>

<style>

</style>
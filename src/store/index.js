import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import user from "./modules/user";
import accomodation from "./modules/accomodation";
import reservation from "./modules/reservation"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    user,
    accomodation,
    reservation
  },
});

import axios from 'axios'

const state = {
    result: null,
    reservations: []
};
  
const getters = {
    getResult: (state) => state.result,
    getReservations: (state) => state.reservations
};
  
const actions = {
    getOwnerActive: (context, ownerId) => {
      axios.get(`/reservationRequest/owner/` + ownerId)
      .then(response => {
        context.commit("setReservations", response.data);
      })
      .catch(error => {
        context.commit("setResult", {label: "fetchReservations", ok: false, message: error.response.data.errorMessage })
      })
    },
    getGuestAll: (context, guestId) => {
        axios.get(`/reservationRequest/guest/` + guestId + "/all")
        .then(response => {
          context.commit("setReservations", response.data);
        })
        .catch(error => {
          context.commit("setResult", {label: "fetchReservations", ok: false, message: error.response.data.errorMessage })
        })
    },
    getOwnersReservations: (context, {ownerId, status}) => {
        axios.get(`/reservationRequest/owners/` + ownerId + "?status=" + status)
        .then(response => {
          context.commit("setReservations", response.data);
        })
        .catch(error => {
          context.commit("setResult", {label: "fetchReservations", ok: false, message: error.response.data.errorMessage })
        })
    },
};
  
const mutations = {
    setResult: (state, result) => {
      state.result = result;
    },

    setReservations: (state, reservations) => {
      state.reservations = reservations;
    }
};
  
export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true,
  };
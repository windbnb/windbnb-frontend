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
    deleteReservationRequest: (context, id) => {
      axios.delete(`/reservationRequest/` + id)
      .then(response => {
        context.commit("setResult", {label: "deleteReservationRequest", ok: true, message: "You have successfully deleted reservation."});
      })
      .catch(error => {
        context.commit("setResult", {label: "deleteReservationRequest", ok: false, message: error.response.data.errorMessage })
      })
    },
    cancelReservation: (context, id) => {
      axios.put(`/reservationRequest/` + id + `/cancel`)
      .then(response => {
        context.commit("setResult", {label: "cancelReservationRequest", ok: true, message: "You have successfully canceled reservation."});
      })
      .catch(error => {
        context.commit("setResult", {label: "cancelReservationRequest", ok: false, message: error.response.data.errorMessage })
      })
    },
    acceptReservationRequest: (context, id) => {
      axios.put(`/reservationRequest/` + id + `/accept`)
      .then(response => {
        context.commit("setResult", {label: "acceptReservationRequest", ok: true, message: "You have successfully accepted reservation."});
      })
      .catch(error => {
        context.commit("setResult", {label: "acceptReservationRequest", ok: false, message: error.response.data.errorMessage })
      })
    },
    getGuestActive: (context, guestId) => {
      axios.get(`/reservationRequest/guest/` + guestId)
      .then(response => {
        context.commit("setReservations", response.data);
      })
      .catch(error => {
        context.commit("setResult", {label: "fetchReservations", ok: false, message: error.response.data.errorMessage })
      })
    }
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
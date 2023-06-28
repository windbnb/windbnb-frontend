import axios from 'axios'

const state = {
    result: null,
    review: null,
    averageAccomodation: null,
    reviewForAccomodation: null
};
  
const getters = {
    getResult: (state) => state.result,
    getReview: (state) => state.review,
    getAverageAccomodation: (state) => state.averageAccomodation,
    getReviewForAccomodation: (state) => state.getReviewForAccomodation
};

 
const actions = {
    createAccomodationReview: (context, rate) => {
      axios.post(`/review/accomodation-rating`,  rate)
      .then(response => {
        context.commit("setReview", response.data);
      })
      .catch(error => {
        context.commit("setResult", {label: "create", ok: false, message: error.response.data.errorMessage })
      })
    },

    createHostReview: (context, rate) => {
        axios.post(`/review/host-rating`,  rate)
        .then(response => {
          context.commit("setReview", response.data);
        })
        .catch(error => {
          context.commit("setResult", {label: "create", ok: false, message: error.response.data.errorMessage })
        })
      },
   
    fetchAverageAccomodation: (context, id) => {
        axios.get(`/review/accomodation-rating/accomodation/`+  id)
        .then(response => {
          context.commit("setAverageAccomodation", response.data);
        })
        .catch(error => {
          context.commit("setResult", {label: "create", ok: false, message: error.response.data.errorMessage })
        })
      },

    getReviewGuestAccomodation: (context, obj) => {
      axios.get(`/review/accomodation-rating/accomodation/`+  obj.guestId + `/`+ obj.accomodationId)
        .then(response => {
          context.commit("setReviewForAccomodation", response.data);
        })
        .catch(error => {
          context.commit("setResult", {label: "create", ok: false, message: error.response.data.errorMessage })
        })
      },
};
  
const mutations = {
    setResult: (state, result) => {
      state.result = result;
    },

    setReview: (state, review) => {
      state.review = review;
    },

    setAverageAccomodation: (state, average) => {
      state.averageAccomodation = average;
    },

    setReviewForAccomodation: (state, reviewForAccomodation) => {
      state.reviewForAccomodation = reviewForAccomodation;
    }
};
  
export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true,
  };
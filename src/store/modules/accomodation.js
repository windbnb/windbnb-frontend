import axios from 'axios'

const state = {
    result: null,
    accomodation: null
};
  
const getters = {
    getResult: (state) => state.result,
    getAccomodation: (state) => state.accomodation
};
  
const actions = {
   
    createAccomodation: (context, createAccomodationDto) => {
      axios
        .post(`/accomodation/create`, createAccomodationDto)
        .then((response) => {
          context.commit("setAccomodation", response.data);
          context.commit("setResult", { label: "create", ok: true, message: "Accomodation created" });
        })
        .catch((error) => {
          const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
          context.commit("setResult", { label: "create", ok: false, message: message });
        });
    },

    createAvailableTerms: (context, createAvailableTermsDto) => {
      axios
        .post(`/accomodation/availableTerm`, createAvailableTermsDto)
        .then(() => {
          context.commit("setResult", { label: "create", ok: true, message: "Available terms created" });
        })
        .catch((error) => {
          const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
          context.commit("setResult", { label: "create", ok: false, message: message });
        });
    },

    createPrices: (context, createPricesDto) => {
        axios
          .post(`/accomodation/price`, createPricesDto)
          .then(() => {
            context.commit("setResult", { label: "create", ok: true, message: "Prices created" });
          })
          .catch((error) => {
            const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
            context.commit("setResult", { label: "create", ok: false, message: message });
          });
      },
    
};
  
const mutations = {
    setResult: (state, result) => {
      state.result = result;
    },

    setAccomodation: (state, accomodation) => {
      state.accomodation = accomodation;
    }
};
  
export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true,
  };
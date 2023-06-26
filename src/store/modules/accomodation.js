import axios from 'axios'

const state = {
    result: null,
    accomodation: null,
    accomodations: null,
    image: null,
    availableTerms: null,
    prices: null
};
  
const getters = {
    getResult: (state) => state.result,
    getAccomodation: (state) => state.accomodation,
    getAccomodations: (state) => state.accomodations,
    getImage: (state) => state.image,
    getAvailableTerms: (state) => state.availableTerms,
    getPrices: (state) => state.prices
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

    searchAccomodations: (context, searchAccomodationsDto) => {
        axios
        .post(`/accomodation/search/available`, searchAccomodationsDto)
        .then((response) => {
          context.commit("setAccomodations", response.data);
          context.commit("setResult", { label: "search", ok: true, message: "" });
        })
        .catch((error) => {
          const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
          context.commit("setResult", { label: "search", ok: false, message: message });
        });
    },

    fetchImage: (context, imageName) => {
        axios
        .get(`/accomodation/image/` + imageName)
        .then((response) => {
          context.commit("setImage",  new Blob([response.data]), {type: "image/jpg"});
          context.commit("setResult", { label: "image", ok: true, message: "" });
        })
        .catch((error) => {
          const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
          context.commit("setResult", { label: "image", ok: false, message: message });
        });
    },

    fetchAccomodationsForHost: (context, hostId) => {
      axios
      .get(`/accomodation/for-host/` + hostId)
      .then((response) => {
        context.commit("setAccomodations", response.data);
        context.commit("setResult", { label: "image", ok: true, message: "" });
      })
      .catch((error) => {
        const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
        context.commit("setResult", { label: "image", ok: false, message: message });
      });
  },

  fetchAvailableTermsForAccomodation: (context, accomodationId) => {
    axios
    .get(`/accomodation/availableTerm/for-accomodation/` + accomodationId)
    .then((response) => {
      context.commit("setAvailableTerms", response.data);
      context.commit("setResult", { label: "fetch", ok: true, message: "" });
    })
    .catch((error) => {
      const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
      context.commit("setResult", { label: "fetch", ok: false, message: message });
    });
  },

  deleteAvailableTerm: (context, id) => {
    axios
      .delete(`/accomodation/availableTerm/`+ id)
      .then(() => {
        context.commit("setResult", { label: "delete", ok: true, message: "Successfully deleted" });
      })
      .catch((error) => {
        const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
        context.commit("setResult", { label: "delete", ok: false, message: message });
      });
  },

  fetchPricesForAccomodation: (context, accomodationId) => {
    axios
    .get(`/accomodation/price/for-accomodation/` + accomodationId)
    .then((response) => {
      context.commit("setPrices", response.data);
      context.commit("setResult", { label: "fetch", ok: true, message: "" });
    })
    .catch((error) => {
      const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
      context.commit("setResult", { label: "fetch", ok: false, message: message });
    });
  },

  deletePrice: (context, id) => {
    axios
      .delete(`/accomodation/price/`+ id)
      .then(() => {
        context.commit("setResult", { label: "delete", ok: true, message: "Successfully deleted" });
      })
      .catch((error) => {
        const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
        context.commit("setResult", { label: "delete", ok: false, message: message });
      });
  },

    
};
  
const mutations = {
    setResult: (state, result) => {
      state.result = result;
    },

    setAccomodation: (state, accomodation) => {
      state.accomodation = accomodation;
    },

    setAccomodations: (state, accomodations) => {
        state.accomodations = accomodations;
    },

    setImage: (state, image) => {
        state.image = image;
    },

    setAvailableTerms: (state, availableTerms) => {
      state.availableTerms = availableTerms;
    },

    setPrices: (state, prices) => {
      state.prices = prices;
    }
};
  
export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true,
  };
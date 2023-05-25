import axios from 'axios'

const state = {
    result: null,
};
  
const getters = {
    getResult: (state) => state.result
};
  
const actions = {
   
    createUser: (context, createUserDto) => {
      axios
        .post(`/users/register`, createUserDto)
        .then((response) => {
          context.commit("setResult", { label: "create", ok: true, message: "User registered." });
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
    }
};
  
export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true,
  };
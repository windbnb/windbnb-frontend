import axios from 'axios'

const state = {
    result: null,
    user: null
};
  
const getters = {
    getResult: (state) => state.result,
    getUser: (state) => state.user
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

    fetchUser: (context, id) => {
      axios.get(`/users/` + id)
      .then(response => {
        context.commit("setUser", response.data);
      })
      .catch(error => {
        context.commit("setResult", {label: "fetchUser", ok: false, message: error.response.data.errorMessage })
      })
    },

    updateUser: (context, updateUserDto) => {
      axios
        .put(`/users/` + updateUserDto.id, updateUserDto)
        .then((response) => {
          context.commit("setUser", response.data);
          context.commit("setResult", { label: "update", ok: true, message: "User information updated." });
        })
        .catch((error) => {
          const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
          context.commit("setResult", { label: "update", ok: false, message: message });
        });
    },

    changePassword: (context, changePasswordDto) => {
        axios
          .put(`/users/change-password/` + changePasswordDto.id, changePasswordDto)
          .then(() => {
            context.commit("setResult", { label: "change", ok: true, message: "Successfully changed password" });
          })
          .catch((error) => {
            const message = error.response.data.message !== undefined ? error.response.data.message : error.response.data.errorMessage;
            context.commit("setResult", { label: "change", ok: false, message: message });
          });
	},
	
	deleteUser: (context, id) => {
		axios
		  .delete(`/users/` + id)
		  .then((response) => {
			context.commit("setResult", { label: "delete", ok: true, message: "Successfully deleted account." });
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

    setUser: (state, user) => {
      state.user = user;
    }
};
  
export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true,
  };
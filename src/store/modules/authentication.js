import axios from 'axios'
import {setToken, removeToken} from '../../utils/token'

const state = {
    result: null
};

const getters = {
    getResult: state => state.result
};  

const actions = {
    authenticate: (context, credentials) => {
        axios.post('/users/login', credentials)
        .then(response => {
            setToken(response.data.token);
            
            context.commit('setResult', {
                label: 'authenticate',
                ok: true,
                message: ''
            });
            
        })
        .catch(error => {
            const message = error.response.data.errorMessage !== undefined? error.response.data.errorMessage : 'Bad credentials!';
            context.commit('setResult', {
                label: 'authenticate',
                ok: false,
                message: message
            });
        });        
    },

    logOut: () => {
        const token = sessionStorage.getItem('token');
            removeToken(token);
    }
};

const mutations = {
    setResult: (state, response) => {
        state.result = response;
    }
};

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    namespaced: true
};
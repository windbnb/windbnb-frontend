import axios from 'axios'
import {setToken} from '../../utils/token'

const state = {
    result: null
};

const getters = {
    getResult: state => state.result
};  

const actions = {
    authenticate: (context, credentials) => {
        axios.post('/auth/login', credentials)
        .then(response => {
            setToken(response.data.accessToken);
            
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
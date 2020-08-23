import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.store'
import school from './school.store'
import channel from './channel.store'

Vue.use(Vuex)

export default new Vuex.Store({
 	state: {
  		errors: [],
        isLoading: false,
        loadPage: false,
        token: localStorage.getItem('token'),
        baseURL: process.env.VUE_APP_URL
  	},
  	getters: {
        isAuth: state => {
  		    return state.token != "null" && state.token != null
        },
        isLoading: state => {
  		    return state.isLoading
        },
        baseURL: state => {
  		    return state.baseURL
        },
        loadPage: state => {
            return state.loadPage
        }
    },
 	mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload
        },
        SET_ERRORS(state, payload) {
            state.errors = payload
        },
        CLEAR_ERROR(state, payload) {
            state.errors = []
        },
        SET_LOADING(state, payload) {
            state.isLoading = payload
        },
        SET_BASEURL(state, payload) {
            // state.baseURL = payload
        },
        SET_LOAD_PAGE(state, payload) {
            state.loadPage = payload
        }
    },
  	modules: {
  		auth,
      school,
      channel
  	}
})

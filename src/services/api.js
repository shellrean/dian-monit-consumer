import axios from 'axios'
import store from '@/store'
import router from '@/router'

const $axios = axios.create({
	headers: {
		'Accept' : 'application/json'
	}
})

$axios.interceptors.request.use(
	function(config) {
		store.commit('SET_LOADING', true, { root: true })
		config.headers.Authorization = `Bearer ${store.state.token}`
		config.url = `${store.state.baseURL}/api/v1/${config.url}`
		return config
	},
	function(error) {
		store.commit('SET_LOADING', false, { root: true })
		return Promise.reject(error)
	}
)

$axios.interceptors.response.use(
	(response) => {
		store.commit('SET_LOADING', false, { root: true })
		return response
	},
	(error) => {
		store.commit('SET_LOADING', false, { root: true })
		if(error.response.status == 401) {
			new Promise((resolve, reject) => {
				delete localStorage.token
				resolve()
			}).then(() => {
				store.state.token = localStorage.getItem('token')
				router.push({ name: 'login' })
			})
		}
		return Promise.reject(error)
	}
)

export default $axios
import $axios from '@/services/api'

const state = () => ({
	school: {},
	schools: []
})

const mutations = {
	ASSIGN_SCHOOLS(state, payload) {
		state.schools = payload
	},
	ASSIGN_SCHOOL(state, payload) {
		state.school = payload
	},
	CLEAR_SCHOOL(state, payload) {
		state.school = {}
	}
}

const actions = {
	getDataSchools({ commit }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get('schools')

				commit('ASSIGN_SCHOOLS', network.data.data)
				resolve(network.data)
			} catch (error) {
				reject(error.response.data)
			}
		})
	},

	getDataSchool({ commit }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`schools/${payload}`)

				commit('ASSIGN_SCHOOL', network.data.data)
				resolve(network.data)
			} catch (error) {
				reject(error.response.data)
			}
		})
	},

	createDataSchool({ commit, state }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.post(`schools`, state.school)

				commit('CLEAR_SCHOOL')
				resolve(network.data)
			} catch (error) {
				reject(error.response.data)
			}
		})
	},

	updateDataSchool({ commit, state }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.put(`schools/${state.school.id}`, state.school)

				commit('CLEAR_SCHOOL')
				resolve(network.data)
			} catch (error) {
				reject(error.response.data)
			}
		})
	},

	deleteDataSchool({ commit }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.delete(`schools/${payload}`)

				resolve(network.data)
			} catch (error) {
				reject(error.response.data)
			}
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
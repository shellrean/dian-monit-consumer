import $axios from '@/services/api'

const state = () => ({
	school_reports: []
})

const mutations = {
	ASSIGN_SCHOOL_REPORTS(state, payload) {
		state.school_reports = payload
	}
}

const actions = {
	getDataSchoolReports({ commit }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				let date = typeof payload.date != 'undefined' ? payload.date : ''
				let network = await $axios.get(`reports?q=${date}`)

				commit('ASSIGN_SCHOOL_REPORTS', network.data.data)
				resolve(network.data)
			} catch (error) {
				reject(error.response.data)
			}
		})
	},
	getDataReportSchool({ commit }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				let date = typeof payload.date != 'undefined' ? payload.date : ''
				let network = await $axios.get(`reports/${payload.id}?q=${payload.date}`)

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
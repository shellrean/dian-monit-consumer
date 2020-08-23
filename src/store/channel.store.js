import io from 'socket.io-client'

const state = () => ({
	users: [],
	socket: io('http://localhost:4000'),
})

export default {
	namespaced: true,
	state
}
import io from 'socket.io-client'

const state = () => ({
	users: [],
	socket: io('http://localhost:4000', {'forceNew':true }),
})

export default {
	namespaced: true,
	state
}
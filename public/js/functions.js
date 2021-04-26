const socket = io('ws://localhost:3000')
socket.on('init', text => {
	console.log(text)
})
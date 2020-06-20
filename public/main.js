const SOCKET = io('http://localhost:3100')
SOCKET.emit('helloworld', 'wewerehere')

// SOCKET.on('chat-message', data => {
//     appendMessage(data)
// })




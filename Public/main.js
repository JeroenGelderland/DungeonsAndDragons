const SOCKET = io('http://localhost:3100')
SOCKET.emit('user-connected')

SOCKET.on('user-connected', name => {
    if(name !== null){
        alert(name + " joined")
    }
})

SOCKET.on('user-disconnected', name => {
    if(name !== null){
        alert(name + " left")
    }
})





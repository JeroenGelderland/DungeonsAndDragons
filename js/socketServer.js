import socketio from 'socket.io'

export default class SocketServer{

    constructor(server, port=3000){
        this.io = socketio(port).listen(server)
    }

    startSocketService(service){
        service.run(this.io)
    }

}        
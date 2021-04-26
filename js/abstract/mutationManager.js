export default class MutationManager{

    constructor() {

        this.version = new Date()
        this.mutations = []
    }

    run(io){
        io.on('connection', socket => {

            this.initSocketConnection(socket)

        })
    }

    initSocketConnection(socket){
        message = {version : this.version, mutations : this.mutations}
        socket.emit('init', message)
    }
}
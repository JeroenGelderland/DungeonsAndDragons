import Database from '../database.js'

export default class MutationManager{

    constructor() {

        this.database = new Database()
        this.version = new Date()
        this.mutations = []
    }

    run(io){
        io.on('connection', socket => {

            this.listenSocketConnection(socket)
            this.listenForMutations(socket)

        })
    }


    listenSocketConnection(socket){
        let message = {version : this.version, mutations : this.mutations}
        socket.emit('init', message)
    }

    listenForMutations(socket){
        
        socket.on('mutation', data => {
            let mutation = new Mutation(data.id, data.entityId, data.field, data.value)
            
            this.mutations.push(mutation)
            socket.sockets.emit('mutation', mutation.toJson())
        })
    }

    listenForSyncDataRequest(socket){
        
        socket.on('syncData', () => {
            socket.emit('syncData', this.database.data)
        })
    }
}
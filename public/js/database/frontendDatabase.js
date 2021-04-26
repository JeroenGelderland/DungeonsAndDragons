import Database from './database.js'

export default class FrontendDatabase extends Database {

    constructor(socket) {
        super()
        this.socket = socket
        this.load()
    }

    Mutate(mutation) {
        super.Mutate(mutation)
        this.socket.emit('mutation', mutation)
    }

    load() {
        this.socket.emit('syncData')
        this.socket.on('syncData', data => {
            this.data = data
        })
    }
}


import Database from './database.js'
import Mutation from '../mutation.js'


const URL = 'ws://localhost:3000'

class FrontendDatabase extends Database {

    constructor() {
        super()
        this.socket = io(URL)
        this.load()
        this.sentMutations = []
    }

    start() {
        socket.on('mutation', mutation => {
            if(!sentMutations.some(m => m.id === mutation.id)){
              database.Mutate(mutation)
            }
          })
    }

    Mutate(mutation) {
        super.Mutate(mutation)
    }

    load() {
        this.socket.emit('syncData')
        this.socket.on('syncData', data => {
            this._data = data
            super.load()
        })
    }

    SendMutation (EntityId, field, value) {
        let mutation = new Mutation(EntityId, field, value)
        this.Mutate(mutation)
        this.sentMutations.push(mutation)
        socket.emit('mutation', mutation.toJson())
    }
}

const database = new FrontendDatabase().Proxy()
export default database
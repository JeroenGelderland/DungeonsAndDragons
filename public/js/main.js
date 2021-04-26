import FrontendDatabase from './database/frontendDatabase.js'
import Mutation from './mutation.js'

const URL = 'ws://localhost:3000'

const socket = io(URL)
const database = new FrontendDatabase(socket)

let sentMutations = []

socket.on('mutation', mutation => {
  if(!sentMutations.some(m => m.id === mutation.id)){
    database.Mutate(mutation)
  }
})

function sendMutation(EntityId, field, value){
  let mutation = new Mutation(EntityId, field, value)
  sentMutations.push(mutation)
  socket.emit('mutation', mutation.toJson())
}


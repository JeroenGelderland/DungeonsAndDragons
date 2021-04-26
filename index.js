import Server from './js/server.js'
import SocketServer from './js/socketServer.js'

import MutationManager from './js/mutation/mutationManager.js'

const SERVER            = new Server()
const SOCKET_SERVER     = new SocketServer(SERVER.http, 3000)

SOCKET_SERVER.startSocketService(new MutationManager())
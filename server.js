const {Database} = require("./Utils/Database");

const EXPRESS       = require('express')
const HTTP          = require('http')
const PORT          = 3000
const SOCKETIO      = require('socket.io')(PORT + 100)
const FS            = require('fs')

const DATABASE_FILE = './Utils/database.json'
const APP           = EXPRESS()
const SERVER        = HTTP.createServer(APP)
const IO            = SOCKETIO.listen(SERVER)


const { Socket } = require('dgram')

const DATA = JSON.parse(FS.readFileSync(DATABASE_FILE))
const DATABASE = new Database()

APP.use(EXPRESS.static('Public'))

APP.get('/', (req, res) => res.sendFile('index.html', { root: __dirname }))
APP.get('/create.player', (req, res) => res.sendFile('Player/Create.html', { root: __dirname }))

SERVER.listen(PORT, () => {

    IO.on('connection', SOCKET => {
        SOCKET.on('user-connected', e => {
            SOCKET.emit("data", DATABASE.GetData())
        })
    })

    console.log(`listening at http://localhost:${PORT}`)
})

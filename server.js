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

APP.use(EXPRESS.static('Public'))

APP.get('/', (req, res) => res.sendFile('index.html', { root: __dirname }))

SERVER.listen(PORT, () => {

    IO.on('connection', SOCKET => {

        SOCKET.on('user-connected', e => {
            let test = new Database();
            test.backUpStorage();
            SOCKET.emit('init', DATA)
        })

        SOCKET.on('disconnect', e => {
            console.log('user disconnnected')
        })

        SOCKET.on('pick-game', choice => {
            console.log(choice)
        })
    })

    console.log(`listening at http://localhost:${PORT}`)
})

const {Database} = require("./Utils/Database");
const {PlayerController} = require("./Controller/PlayerController")
const {GameController} = require("./Controller/GameController")

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

SERVER.listen(PORT, () => {

    IO.on('connection', SOCKET => {

        SOCKET.on('user-connected', e => {
            new PlayerController(DATABASE).List()
            SOCKET.emit('login')
        })

        SOCKET.on('login-attempt', userName => {
            const pc = new PlayerController(DATABASE)
            if( pc.Login(userName)){
                SOCKET.emit("login-attempt-succes", pc.GetUserId(userName))
            }
            else{
                SOCKET.emit("login-attempt-failed")
            }
        })

        SOCKET.on("start", user => {
            let Gc = new GameController(DATABASE)
            SOCKET.emit("start",  DATABASE.GetData())
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

const EXPRESS = require("express")
const HTTP = require('http')
const PORT = 3000
const SOCKETIO = require("socket.io")(PORT + 100)
const FS = require('fs')

const DATABASE_FILE = "./Utils/database.json"
const APP = EXPRESS()
const SERVER = HTTP.createServer(APP)
const IO = SOCKETIO.listen(SERVER)


const { Socket } = require("dgram")
const {GameHandler} = require("./Handlers/GameHandler")

const DATA = JSON.parse(FS.readFileSync(DATABASE_FILE))
const GAME_HANDLER = new GameHandler();


APP.use(EXPRESS.static('Public'))

APP.get('/', (req, res) => res.sendFile("portal.html", { root: __dirname }))

SERVER.listen(PORT, () => {

    IO.on('connection', SOCKET => {

        SOCKET.on('user-connected', e =>{
            SOCKET.emit('init', DATA.games)
        })

        SOCKET.on('disconnect', e => {
            console.log("user disconnnected")
        })

        SOCKET.on('pick-game', choice => {

            console.log(choice)
            GAME_HANDLER.addUserToGame(SOCKET.id ,choice.user, choice.game)
            console.log(GAME_HANDLER.games[0].users)
        })
    })
    console.log(`listening at http://localhost:${PORT}`)
})

const EXPRESS = require("express")
const HTTP = require('http')
const PORT = 3000
const SOCKETIO = require("socket.io")(PORT + 100)

const APP = EXPRESS()
const SERVER = HTTP.createServer(APP)
const IO = SOCKETIO.listen(SERVER)

const {UserController} = require("./Controller/UserController")

APP.use(EXPRESS.static('Public'))

APP.get('/', (req, res) => res.sendFile("portal.html", { root: __dirname }))

SERVER.listen(PORT, () => {

    IO.on('connection', SOCKET => {

        SOCKET.on('user-connected', e =>{

            console.log("user joined")
        })

        SOCKET.on('login', function (name) {
            UserController.login(name)
        } )

        SOCKET.on('disconnect', e => {
            console.log("user disconnnected")
        })
    })
    console.log(`listening at http://localhost:${PORT}`)
})

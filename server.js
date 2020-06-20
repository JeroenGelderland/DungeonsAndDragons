const EXPRESS = require("express")
const HTTP = require('http')
const PORT = 3000
const SOCKETIO = require("socket.io")(PORT + 100)

const APP = EXPRESS()
const SERVER = HTTP.createServer(APP)
const IO = SOCKETIO.listen(SERVER)


APP.use(EXPRESS.static('public'))

APP.get('/', (req, res) => res.sendFile("portal.html", { root: __dirname }))



SERVER.listen(PORT, () => {
    IO.on('connection', SOCKET => {
        SOCKET.on('helloworld', e => {
            console.log(e)
        })
    })
    console.log(`listening at http://localhost:${PORT}`)
})

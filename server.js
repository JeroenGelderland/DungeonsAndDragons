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

const uuid = () => { let a,b;for(b=a='';b++<36;a+=~b%5|b*3&4?(b^15?8^Math.random()*(b^20?16:4):4).toString(16):'-');return a }

APP.use(EXPRESS.static('Public'))

APP.get('/', (req, res) => res.sendFile('portal.html', { root: __dirname }))

SERVER.listen(PORT, () => {

    IO.on('connection', SOCKET => {

        SOCKET.on('user-connected', e => {
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

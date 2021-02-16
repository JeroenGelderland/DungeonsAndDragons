const PORTS = {
    http:    3000,
    sockets: 3100
}

import dotenv     from 'dotenv'
import http       from 'http'
import express    from 'express'
import session    from 'express-session'
import socketio   from 'socket.io'
import multer     from 'multer'

import Database   from './server/database/database.js'
import controller from './view/controller.js'
import Player     from './public/js/models/Player.js'

dotenv.config()

const APP      = express()
const SERVER   = http.createServer(APP)
const IO       = socketio(PORTS.sockets).listen(SERVER)
const UPLOAD   = multer({ dest: 'public/images/appearance' })
const DATABASE = new Database()

APP.use(express.static('public'))
APP.use(express.urlencoded({ extended: true }))
APP.use(session({
    secret: 'MIJN_SUPER_DUPER_GEHEIME_SLEUTEL',
    resave: true,
    saveUninitialized: true
}))

const ENV = process.env

APP.get( '/',        Authenticate, controller.home   .getter)
APP.get( '/players', Authenticate, controller.players.getter)
APP.get( '/games',   Authenticate, controller.games  .getter)
APP.get( '/login',                 controller.login  .getter)
APP.post('/login',                 controller.login  .poster, (req, res) => res.sendFile('portal.html', { root: './' }))

APP.get('/logout', (req, res) => {
    delete req.session.user
    if (req.xhr) res.json(controller.RES_Login())
    else {
        res.status(401).redirect('/login')
    }
})

// APP.get( '/current-user', Authenticate, (req, res) => res.json(req.session.user))

// APP.post('/player/create', Authenticate, controller.player.poster) // todo: bedenk waar je heen gaat na succesvol aanmaken

APP.get('/create-game', Authenticate, (req, res) => res.json(controller.RES_GameCreate))
APP.post('/create-game', Authenticate, (req) => {
    console.log(req.body)
})

APP.get('/game/:game_name', Authenticate, (req, res) => res.json(DATABASE.FindGame(req.params.game_name)))

SERVER.listen(PORTS.http, () => {
    IO.on('connection', SOCKET => {
        SOCKET.on('user-connected', e => {
            SOCKET.emit('data', DATABASE.GetData())
        })
    })

    console.log(`listening at http://localhost:${PORTS.http}`)
})

function Authenticate (req, res, next) {
    if (JSON.parse(ENV.DEVELOPER_MODE)) {
        req.session.user = 'dev'
        return next()
    }

    if (req.session.user) {
        console.log('user: ' + req.session.user)
        return next()
    }

    if (req.xhr) res.send('401')
    else res.redirect('/login')
}

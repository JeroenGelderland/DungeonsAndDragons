const PORTS = {
	http:    3000,
	sockets: 3100
}

import dotenv           from 'dotenv'
import http             from 'http'
import express          from 'express'
import session          from 'express-session'
import socketio         from 'socket.io'
import multer           from 'multer'

import Database         from './server/database/database.js'
import * as res_handler from './view/responseHandler.js'
import Player           from './public/js/models/Player.js'

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
const VIEW_ROOT = './view/'

APP.get('/', Authenticate, (req, res) => res.sendFile('index.html', { root: './' }))

APP.get('/portal', Authenticate, (req, res) => {
    if (req.xhr) res.json(res_handler.RES_Portal)
    else res.sendFile('portal.html', { root: VIEW_ROOT })
})

APP.get('/login', (req, res) => {
    if (req.xhr) res.json(res_handler.RES_Login())
    else res.sendFile('login.html', { root: VIEW_ROOT })
})
APP.post('/login', (req, res) => {
    const login_attempt = login(req.body, req)
    if (login_attempt.status) {
        res.status(200).redirect('/portal')
    } else {
        res.status(401).redirect('/login')
    }
})
APP.get('/logout', (req, res) => {
    delete req.session.user
    if (req.xhr) res.json(res_handler.RES_Login())
    else {
        res.status(401).redirect('/login')
    }
})

APP.get('/create-player', Authenticate, (req, res) => {
    if (req.xhr) {
        res.json(res_handler.RES_PlayerCreate)
    }
    else {
        res.sendFile('/player/create.html', { root: VIEW_ROOT })
    }
})
APP.post('/create-player', Authenticate, UPLOAD.single('Appearance'), (req) => {
    req.body.Appearance = req.file.filename
    
    DATABASE.AddPlayer(new Player(req.body))
})

APP.get('/create-game', Authenticate, (req, res) => res.json(res_handler.RES_GameCreate))
APP.post('/create-game', Authenticate, (req) => {
    console.log(req.body)
})

APP.get('/Game.dashboard', Authenticate, (req, res) => {
    res.sendFile('/game/game.html', { root: VIEW_ROOT })
})

APP.get('/game/:game_name', Authenticate, (req, res) => res.json(DATABASE.FindGame(req.params.game_name)))

APP.get('/games', Authenticate, (req, res) => {
    res.json(DATABASE.GetData().games)
})

APP.get('/user', Authenticate, (req, res) => res.json(req.session.user))


SERVER.listen(PORTS.http, () => {
    IO.on('connection', SOCKET => {
        SOCKET.on('user-connected', e => {
            SOCKET.emit('data', DATABASE.GetData())
        })
    })

    console.log(`listening at http://localhost:${PORTS.http}`)
})

function Authenticate(req, res, next) {
    if (JSON.parse(ENV.DEVELOPER_MODE)) {
        req.session.user = 'dev'
        return next()
    }

    if (req.session.user) {
        console.log('user: ' + req.session.user)
        return next()
    }

    if (req.xhr) res.send('401')
    else { res.redirect(ENV.LOGIN_PATH) }

}

function login(login_attempt, req) {
    const user = DATABASE.getUserByName(login_attempt.username)

    if (user !== null) {
        if (user.password === login_attempt.password) {
            req.session.user = user.username
            return { status: true, message: 'success' }
        }
        return { status: false, message: 'incorrect password' }
    }
    return { status: false, message: 'user not found' }

    // de consensus is dat het laatste blokje beter zo geschreven kan worden:

    if (user === null) return { status: false, message: 'user not found' }
    if (user.password !== login_attempt.password) return { status: false, message: 'incorrect password' }

    req.session.user = user.username
    return { status: true, message: 'success' }
}
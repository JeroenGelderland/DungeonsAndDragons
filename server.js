const {Database} = require("./Utils/Database");

const EXPRESS       = require('express')
const SESSION       = require('express-session')
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
APP.use(EXPRESS.urlencoded({extended: true}))
APP.use(SESSION({
    secret: 'MIJN_SUPER_DUPER_GEHEIME_SLEUTEL',
    resave: true,
    saveUninitialized: true
}))


APP.get('/', Authenticate, (req, res) => res.sendFile('index.html', { root: __dirname }))

APP.get('/login', (req, res) => res.sendFile('login.html', { root: __dirname }))
APP.post('/login',(req, res) => {
    const login_attempt = login(req.body, req)
    if (login_attempt.status){
        res.redirect('/')
    }
    else{
        res.redirect('/login')
    }})

APP.get('/player.create', Authenticate,(req, res) => res.sendFile('View/Player/Create.html', { root: __dirname }))
APP.post('/player.create', Authenticate,(req) => {
    console.log(req.body )
})

APP.get('/game.create', Authenticate,(req, res) => res.sendFile('View/Game/Create.html', { root: __dirname }))
APP.post('/game.create', Authenticate,(req) => {
    console.log(req.body)
})

APP.get('/game.list', Authenticate,(req, res) => res.sendFile('View/Game/List.html', { root: __dirname }))
APP.get('/game',Authenticate, (req, res) => res.sendFile('View/Game/Show.html', { root: __dirname }))



SERVER.listen(PORT, () => {

    IO.on('connection', SOCKET => {
        SOCKET.on('user-connected', e => {
            SOCKET.emit("data", DATABASE.GetData())
        })
    })

    console.log(`listening at http://localhost:${PORT}`)
})

function Authenticate(req, res, next){
    if(req.session.user != null){
        return next()
    }
    else{
        res.redirect('/login')
    }
} {

}
let x = 0
function login(login_attempt, req) {
    const user = DATABASE.getUserByName(login_attempt.username)

    if(user != null){
        if(user.password == login_attempt.password){
            req.session.user = user.username
            return {status : true, message : "succes"}
        }
        return {status : false, message : "incorrect credentials"}
    }
    return {status : false, message : "login failed"}
}
(async req => {
    const PORT = 3000

    const ENV_PACKAGE = await req('dotenv')
    ENV_PACKAGE.config()

    const EXPRESS = await req('express')
    const SESSION = await req('express-session')
    const HTTP = await req('http')
    const SOCKETIO = await req('socket.io').then(val => val(PORT + 100))
    const MULTER = await req('multer')


    const APP = EXPRESS()
    const SERVER = HTTP.createServer(APP)
    const IO = SOCKETIO.listen(SERVER)
    const upload = MULTER({ dest: 'public/images/appearance' })

    const { Socket } = await req('dgram')
    const { Database } = require('./server/database/database.js')
    const RES_HANDLER = require('./view/responseHandler.js')
    const { Player } = require('./server/logic/model/Player.js')

    const DATABASE = new Database()


    APP.use(EXPRESS.static('public'))
    APP.use(EXPRESS.urlencoded({ extended: true }))
    APP.use(SESSION({
        secret: 'MIJN_SUPER_DUPER_GEHEIME_SLEUTEL',
        resave: true,
        saveUninitialized: true
    }))
    const ENV = process.env
    const VIEW_ROOT = __dirname + '/view/'

    APP.get('/', Authenticate, (req, res) => res.sendFile('index.html', { root: __dirname }))

    APP.get('/portal', Authenticate, (req, res) => {
        if (req.xhr) res.json(RES_HANDLER.RES_Portal)
        else res.sendFile('portal.html', { root: VIEW_ROOT })
    })

    APP.get('/login', (req, res) => {
        if (req.xhr) res.json(RES_HANDLER.RES_Login())
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
        if (req.xhr) res.json(RES_HANDLER.RES_Login())
        else {
            res.status(401).redirect('/login')
        }
    })

    APP.get('/create-player', Authenticate, (req, res) => {
        if (req.xhr) {
            res.json(RES_HANDLER.RES_PlayerCreate)
        }
        else {
            res.sendFile('/player/create.html', { root: VIEW_ROOT })
        }
    })
    APP.post('/create-player', Authenticate, upload.single('Appearance'), (req) => {
        req.body.Appearance = req.file.filename
        
        DATABASE.AddPlayer(new Player(req.body))
    })

    APP.get('/create-game', Authenticate, (req, res) => res.json(RES_HANDLER.RES_GameCreate))
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


    SERVER.listen(PORT, () => {
        IO.on('connection', SOCKET => {
            SOCKET.on('user-connected', e => {
                SOCKET.emit('data', DATABASE.GetData())
            })
        })

        console.log(`listening at http://localhost:${PORT}`)
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

})(((r, l) => async m => {
    try {
        r.resolve(m)
    } catch {
        l(`Could not resolve "${m}"\nInstalling`);
        r('child_process').execSync(`npm i ${m}`);
        await setImmediate(() => {
        });
        l(`"${m}" has been installed`)
    }
    l(`Requiring "${m}"`);
    try {
        return r(m)
    } catch {
        l(`Could not include "${m}". Restart the script`);
        process.exit(1)
    }
})(require, console.log))
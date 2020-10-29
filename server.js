(async req => {
    const PORT = 3000

    const ENV_PACKAGE = await req('dotenv')
    ENV_PACKAGE.config()

    const EXPRESS = await req('express')
    const SESSION = await req('express-session')
    const HTTP = await req('http')
    const SOCKETIO = await req('socket.io').then(val => val(PORT + 100))

    const APP = EXPRESS()
    const SERVER = HTTP.createServer(APP)
    const IO = SOCKETIO.listen(SERVER)


    const {Socket} = await req('dgram')
    const {Database} = require('./server/database/database.js')
    const RES_HANDLER = require('./view/responseHandler.js')
    const DATABASE = new Database()

    APP.use(EXPRESS.static('public'))
    APP.use(EXPRESS.urlencoded({extended: true}))
    APP.use(SESSION({
        secret: 'MIJN_SUPER_DUPER_GEHEIME_SLEUTEL',
        resave: true,
        saveUninitialized: true
    }))
    const ENV = process.env
    const VIEW_ROOT = __dirname + "/view/"

    APP.get(ENV.INDEX_PATH, (req, res) => res.sendFile('index.html', {root: __dirname}))

    APP.get(ENV.PORTAL_PATH, Authenticate, (req, res) => res.json(RES_HANDLER.RES_Portal))

    APP.get(ENV.LOGIN_PATH, (req, res) => {
        if (req.xhr) res.json(RES_HANDLER.RES_Login())
        else res.sendFile("login.html", {root: VIEW_ROOT})
    })
    APP.post(ENV.LOGIN_PATH, (req, res) => {
        const login_attempt = login(req.body, req)
        if (login_attempt.status) {
            res.status(200).redirect('/portal')
        } else {
            res.status(401).redirect('/login')
        }
    })

    APP.get(ENV.PLAYER_CREATE_PATH, Authenticate, (req, res) => {
        if(req.xhr){
            res.json(RES_HANDLER.RES_PlayerCreate)
        }
        else{
            res.sendFile("/player/create.html", {root: VIEW_ROOT})
        }
    })
    APP.post(ENV.PLAYER_CREATE_PATH, Authenticate, (req) => {
        console.log(req.body)
    })

    APP.get(ENV.GAME_CREATE_PATH, Authenticate, (req, res) => res.json(RES_HANDLER.RES_GameCreate))
    APP.post(ENV.GAME_CREATE_PATH, Authenticate, (req) => {
        console.log(req.body)
    })

    APP.get("/game/:game_name", Authenticate, (req, res) => {
        console.log(req.params)
        console.log(DATABASE.FindGame(req.params.game_name))
        res.json(DATABASE.FindGame(req.params.game_name))
    })

    SERVER.listen(PORT, () => {
        IO.on('connection', SOCKET => {
            SOCKET.on('user-connected', e => {
                SOCKET.emit('data', DATABASE.GetData())
            })
        })

        console.log(`listening at http://localhost:${PORT}`)
    })


    function Authenticate(req, res, next) {

        if (req.session.user !== null && req.session.user != null) {
            console.log("user: "+req.session.user)

            return next()
        } else {
            if(req.xhr) res.send('401')
            else{res.redirect(ENV.LOGIN_PATH)}
        }
    }

    function login(login_attempt, req) {
        const user = DATABASE.getUserByName(login_attempt.username)

        if (user !== null) {
            if (user.password === login_attempt.password) {
                req.session.user = user.username
                return {status: true, message: 'success'}
            }
            return {status: false, message: 'incorrect password'}
        }
        return {status: false, message: 'user not found'}

        // de consensus is dat het laatste blokje beter zo geschreven kan worden:

        if (user === null) return {status: false, message: 'user not found'}
        if (user.password !== login_attempt.password) return {status: false, message: 'incorrect password'}

        req.session.user = user.username
        return {status: true, message: 'success'}
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
(async req => {
  const PORT          = 3000

  const EXPRESS       = await req('express')
  const SESSION       = await req('express-session')
  const HTTP          = await req('http')
  const SOCKETIO      = await req('socket.io').then(val => val(PORT + 100))
  const FS            = await req('fs')

  const APP           = EXPRESS()
  const SERVER        = HTTP.createServer(APP)
  const IO            = SOCKETIO.listen(SERVER)


  const { Socket }    = await req('dgram')

  const DATABASE_FILE = './Utils/database.json'
  const DATA          = JSON.parse(FS.readFileSync(DATABASE_FILE))

  const { Database }  = await req('./Utils/Database')
  const DATABASE      = new Database()

  APP.use(EXPRESS.static('Public'))
  APP.use(EXPRESS.urlencoded({ extended: true }))
  APP.use(SESSION({
    secret: 'MIJN_SUPER_DUPER_GEHEIME_SLEUTEL',
    resave: true,
    saveUninitialized: true
  }))



  APP.get('/', Authenticate, (req, res) => res.sendFile('index.html', { root: __dirname }))

  APP.get('/login', (req, res) => res.sendFile('login.html', { root: __dirname }))
  APP.post('/login', (req, res) => {
    const login_attempt = login(req.body, req)
    if (login_attempt.status) {
      res.status(200).redirect('/')
    } else {
      res.status(401).redirect('/login')
    }
  })

  APP.get('/player.create', Authenticate, (req, res) => res.sendFile('View/Player/Create.html', { root: __dirname }))
  APP.post('/player.create', Authenticate, (req) => {
    console.log(req.body)
  })

  APP.get('/game.create', Authenticate, (req, res) => res.sendFile('View/Game/Create.html', { root: __dirname }))
  APP.post('/game.create', Authenticate, (req) => {
    console.log(req.body)
  })

  APP.get('/game.list', Authenticate, (req, res) => res.sendFile('View/Game/List.html', { root: __dirname }))
  APP.get('/game', Authenticate, (req, res) => res.sendFile('View/Game/Show.html', { root: __dirname }))



  SERVER.listen(PORT, () => {
    IO.on('connection', SOCKET => {
      SOCKET.on('user-connected', e => {
        SOCKET.emit('data', DATABASE.GetData())
      })
    })

    console.log(`listening at http://localhost:${PORT}`)
  })



  function Authenticate (req, res, next) {
    if (req.session.user !== null) {
      return next()
    } else {
      res.redirect('/login')
    }
  }

  function login (login_attempt, req) {
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

})(((r, l) => async m=>{try{r.resolve(m)}catch{l(`Could not resolve "${m}"\nInstalling`);r('child_process').execSync(`npm i ${m}`);await setImmediate(()=>{});l(`"${m}" has been installed`)}l(`Requiring "${m}"`);try{return r(m)}catch{l(`Could not include "${m}". Restart the script`);process.exit(1)}})(require, console.log))
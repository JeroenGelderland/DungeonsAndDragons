import http         from 'http'
import express      from 'express'

export default class Server{

    constructor(port=80){

        this.initApp()
        this.initRoutes()

        this.listen(port)
    }

    initApp(){

        this.app = express()
        this.http = http.createServer(this.app)
        this.app.use(express.static('public'))
    }

    initRoutes(){
        this.app.get('/', (req, res) => {
            res.sendFile('index.html')
        })
    }

    listen(port){
        this.app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }
}

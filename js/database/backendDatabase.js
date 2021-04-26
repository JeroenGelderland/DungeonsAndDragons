import Database from '../../public/js/database/database.js'
import fs from 'fs'

const DEFAULT_SOURCE = 'database.json'

export default class BackendDatabase extends Database{

    constructor(src=DEFAULT_SOURCE){
        super()
        this.src = src
        this.data = this.load()
    }

    load(){
        return JSON.parse(fs.readFileSync(this.src, 'utf8'))
    }

    save(){
        fs.writeFile(this.src, JSON.stringify(this.data), (err) => {
            if (err) throw err
        })
    }
}




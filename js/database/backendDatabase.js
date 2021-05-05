import Database from '../../public/js/database/database.js'
import fs from 'fs'

const DEFAULT_SOURCE = 'database.json'

export default class BackendDatabase extends Database{

    constructor(src=DEFAULT_SOURCE){
        super()
        this.src = src
        this.load()
    }

    load(){
        this._data = JSON.parse(fs.readFileSync(this.src, 'utf8'))
        super.load()
    }

    save(){
        fs.writeFile(this.src, JSON.stringify(this._data), (err) => {
            if (err) throw err
        })
    }
}

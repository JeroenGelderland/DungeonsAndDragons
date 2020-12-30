
import fs from 'fs'

export default class Entity{

    constructor(){
        this.Save()
    }

    Save(){
        fs.readFileSync('../../../server/database/test.json')
    }

}

new Entity()

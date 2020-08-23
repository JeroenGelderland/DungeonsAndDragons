const FS            = require('fs')
const DATABASE_FILE = './Utils/database.json'

class  Database {

    constructor() {
        this.storage = JSON.parse(FS.readFileSync(DATABASE_FILE))
    }

    GetData(){
        return this.storage
    }

    publishUniqueKey(){
        const key = this.generateUniqueKey()
        this.storage.keys.push(key)
        return key
    }

    generateUniqueKey(l = 4){
        let key
        do key = ('0'.repeat(l) + Math.floor(Math.random() * Math.pow(36, l)).toString(36)).slice(-l)
        while(this.storage.keys.includes(key))
        return key
    }

    BackUpStorage(){
        const backupContent = JSON.stringify(this.storage,null,4)
        FS.writeFile(DATABASE_FILE, backupContent,(err) => {
            if (err) throw err
            console.log('The file has been saved!')
        })
    }

    AddPlayer(playerObject){
        this.storage.players[this.publishUniqueKey()] = playerObject
        this.BackUpStorage()
    }

    AddGame(gameObject){
        this.storage.games[this.publishUniqueKey()] = gameObject
        this.BackUpStorage()
    }

}

module.exports = {
    Database
}
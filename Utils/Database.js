const FS            = require('fs')
const DATABASE_FILE = './Utils/database.json'

class  Database {

    constructor() {
        this.storage = JSON.parse(FS.readFileSync(DATABASE_FILE))
    }

    GetData(){
        return this.storage;
    }

    generateUniqueKey(l = 4){
        let key
        do key = ('0'.repeat(l) + Math.floor(Math.random() * Math.pow(36, l)).toString(36)).slice(-l)
        while(this.storage.keys.includes(key))
        this.storage.keys.push(key)
        return key
    }

    backUpStorage(){
        const backupContent = JSON.stringify(this.storage,null,4)
        FS.writeFile(DATABASE_FILE, backupContent,(err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }

    AddPlayer(playerObject){
        this.storage.players[this.generateUniqueKey()] = playerObject
        this.backUpStorage()
    }

}

module.exports = {
    Database
}
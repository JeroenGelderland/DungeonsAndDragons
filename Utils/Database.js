const FS            = require('fs')
const DATABASE_FILE = './Utils/database.json'

class  Database {

    constructor() {
        this.storage = JSON.parse(FS.readFileSync(DATABASE_FILE))
    }

    GetData(){
        return this.storage;
    }

    generateUniqueKey(){
        let key
        do key = (l = 4) => ('0'.repeat(l) + Math.floor(Math.random() * Math.pow(36, l)).toString(36)).slice(-l)
        while(this.storage.keys.includes(key))
        return key
    }

    backUpStorage(){
        const backupContent = JSON.stringify(this.storage,null,4)
        FS.writeFile(DATABASE_FILE, backupContent,(err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
}

module.exports = {
    Database
}
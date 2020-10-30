const FS = require('fs')
const DATABASE_FILE = './server/database/database.json'

class Database {

    constructor() {
        this.storage = JSON.parse(FS.readFileSync(DATABASE_FILE))
    }

    GetData() {
        return this.storage
    }

    publishUniqueKey() {
        const key = this.generateUniqueKey()
        this.storage.keys.push(key)
        return key
    }

    generateUniqueKey(l = 4) {
        let key
        do key = ('0'.repeat(l) + Math.floor(Math.random() * Math.pow(36, l)).toString(36)).slice(-l)
        while (this.storage.keys.includes(key))
        return key
    }

    BackUpStorage() {
        const backupContent = JSON.stringify(this.storage, null, 4)
        FS.writeFile(DATABASE_FILE, backupContent, (err) => {
            if (err) throw err
            console.log('The file has been saved!')
        })
    }

    AddPlayer(obj) {

        let game = this.storage.games.find(game => game.Name == obj.Game);
        if (game.players.find(player => player.Name == obj.Body.Name) == null) {
            this.storage.games.find(game => game.Name == obj.Game).players.push(obj.toJSON())
            this.BackUpStorage()
        }
    }

    FindGame(gameName){
        const game = this.storage.games.find(game => game.Name === gameName)
        if(game !== null)return game
        return 404
    }

    AddGame(gameObject) {
        gameObject.Players = [];
        gameObject.Items = [];
        this.storage.games.push(gameObject)
        this.BackUpStorage()
    }

    AddItem(itemObject) {
        this.storage.games[itemObject.Game].Items.push(itemObject)
        this.BackUpStorage()
    }

    getUserByName(username) {
        return this.storage.users.find(user => user.username == username)
    }
}
module.exports = {
    Database
}
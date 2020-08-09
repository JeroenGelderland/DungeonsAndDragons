class GameHandler {

    constructor () {
        this.games = []
    }

    findGameByName(name) {
        if (this.games.length > 0) {
            for (let i = 0; i < this.games.length; i++) {
                if (this.games[i].naam == name) {
                    return i
                }
            }
        }
        return -1
    }

    addUserToGame(socketid, user, gameName) {
        let gameIndex = this.findGameByName(gameName);
        if (gameIndex != -1) {
            this.games[gameIndex].users.push({ naam: user, id: socketid })
        }

        else {
            this.games.push({ naam: gameName, users: [{ naam: user, id: socketid }] })
        }
    }
}

module.exports = {
    GameHandler
}
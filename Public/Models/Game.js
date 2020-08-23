import {List} from "../utils/List";

class Game {

    constructor(name, pass, players = new List()) {
        this.name = gameName
        this.pass = pass
        this.Players = players
        this.dungeonMaster(name, pass)
    }

    SetDungeonMaster(name, pass){
        this.dungeonMaster = {name : name, pass : pass}
    }

    AddPlayers(players){
        players.forEach(player => {
            this.AddPlayer(player)
        })
    }

    AddPlayer(player){
        this.Players.Add(player)
    }

    ToJson(){
        return {pass : this.pass, players : this.playerIdArray()}
    }

    Save(){
        SOCKET.emit("save-game", this.name, this.ToJson())
    }

    playerIdArray(){
        const idArray = []
        this.Players.Array.forEach(player => {
            idArray.push(player.id)
        })
        return idArray
    }
}
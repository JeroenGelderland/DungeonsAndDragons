class GameController {

    constructor(database) {
        this.database = database

    }

    //display

    List(){
        return this.database.GetData().games
    }

    Show(id){
        return this.database.GetData().games[id]
    }

    //creators

    Create(obj){

        this.database.AddGame(obj)
        console.log(this.database.GetData())
    }

    Edit(id, obj){
        this.database.games[id] = obj;
        this.database.BackUpStorage();
    }

    Delete(id){
        delete this.database.games[id]
        this.database.keys.splice(this.database.keys.indexOf(id), 1)
    }


    //actions


}

module.exports = {
    GameController
}
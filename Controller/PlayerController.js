class PlayerController {

    constructor(database) {
        this.database = database

    }

    //display

    List(){
        return this.database.GetData().players
    }

    Show(id){
        return this.database.GetData().players[id]
    }

    //creators

     Create(obj){

        this.database.AddPlayer(obj)
         console.log(this.database.GetData())
     }

     Edit(id, obj){
        this.database.players[id] = obj;
        this.database.BackUpStorage();
     }

     Delete(id){
         delete this.database.players[id]
         this.database.keys.splice(this.database.keys.indexOf(id), 1)
     }

     GetUserId(name){
         const players = this.database.storage.players;
         for(let i = 0; i < Object.keys(players).length; i++){
             if(players[Object.keys(players)[i]].name == name) {
                 return Object.keys(players)[i]
             }
             return null
         }
    }


    //actions

    Login(name){
        const players = this.database.storage.players;
        for(let i = 0; i < Object.keys(players).length; i++){
            if(players[Object.keys(players)[i]].name == name) {
                return true;
            }
            return false
        }

    }
}

module.exports = {
    PlayerController
}
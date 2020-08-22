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


    //actions

    Login(name){
        let user = this.database.users.find(user => user.naam == name)
        if(user){
            sessionStorage.setItem("user", user)
            return true;
        }
        return false;
    }
}

module.exports = {
    PlayerController
}
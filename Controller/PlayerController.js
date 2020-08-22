class PlayerController {

    constructor(database) {
        this.database = database

    }

    //display

    list(){
        return this.database.GetData().players

    }

    show(id){
        return this.database.GetData().players[id]
    }

    //creators

     create(obj){

        this.database.AddPlayer(obj)
         console.log(this.database.GetData())
     }

     edit(id, obj){
        this.database.players[id] = obj;
        this.database.backUpStorage();
     }

     delete(id){
         delete this.database.players[id]
         this.database.keys.splice(this.database.keys.indexOf(id), 1)
     }



    //actions

    login(name){
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
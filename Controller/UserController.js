class UserController {


    constructor(database) {
        this.database = database

    }

    //display

    list(){
        this.show("84AF")
        this.create("pietje", 100)
        return this.database.GetData().players

    }

    show(id){
        return this.database.GetData().players[id]
    }

    //writers

     create(obj){

        const hpObj = {total : hp, current : hp}

        const player = {
            name : name,
            hp : hpObj,
            items : {}
        }
        this.database.AddPlayer(player)
         console.log(this.database.GetData())
     }

     edit(id){

     }

     delete(id){}

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
    UserController
}
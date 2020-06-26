const DATA = require("../Utils/database.json")

class UserController {

    //display

    static list(){}

    static show(id){}

    //creators

    static create(){}

    static edit(id){}

    static delete(id){}

    //writers

    static store(){}

    static update(id){}

    static persist(id){}

    //actions

    static login(name){
        let user = DATA.users.find(user => user.naam == name)
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
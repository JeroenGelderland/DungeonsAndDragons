const MYSQL = require('mysql')

class Database {

    static createConnection(){
        const con = MYSQL.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "rpg"
        });

        return con;
    }

    static getUserByName(name){
        const c = this.createConnection()
        name = this.sanitizeString(name)
        const sql = `SELECT * FROM user WHERE naam = '${name}';`
        c.query(sql, function (err, result) {
            if (err) throw err
            return result[0];
        })
    }

    static confirmLogin(name, password){
        const c = this.createConnection()
        name = this.sanitizeString(name)
        password = this.sanitizeString(password)
        const sql = `SELECT * FROM user WHERE naam = '${name}' AND wachtwoord = '${password}';`
        c.query(sql, function (err, result) {
            if (err) return {succes: false, reason: "database failure"}
            if (result.length != 1) return {succes: false, reason: "no user with credentials"}
            if(result.password == password && result.name == name) return  {succes: true, reason: "user is the one true user"}

        })
    }

    static sanitizeString(str){
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
        return str.trim();
    }
}

module.exports = {
    Database
}
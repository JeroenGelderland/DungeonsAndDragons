const {Inventory} = require("./Inventory.js")

class Player {

    constructor(data, user) {

        this.Name = data.Name
        this.Img_url = data.Appearance
        this.Game = data.Game

        this.Class = data.Class
        this.Race = data.Race
        this.Alignment = data.Alignment

        this.Strenght = parseInt(data.Strenght)
        this.Dexterity = parseInt(data.Dexterity)
        this.Constitution = parseInt(data.Constitution)
        this.Intelligence = parseInt(data.Intelligence)
        this.Wisdom = parseInt(data.Wisdom)
        this.Charisma = parseInt(data.Charisma)

        this.Proficiency = parseInt(data.Proficiency_bonus)
        this.Experience = parseInt(data.Experience_points)

        this.Level = 1
        this.Experience = 0
        this.Inspiration = false
        this.User = user

        this.SavingThrows = "savingThrows" in data ? data.savingThrows : [] //werkt nog niet
        this.Skills = "skill" in data ? data.skills : []  //werkt nog niet

        this.Inventory = new Inventory()
    }

    ToJson(){
        return JSON.stringify(this)
    }
}

module.exports = {
    Player
}
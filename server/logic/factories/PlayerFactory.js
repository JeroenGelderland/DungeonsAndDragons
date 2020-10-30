const Player = require("../model/Player")

class PlayerFactory {

        create_player(){
        return new Player.Player()
    }

    create_player(data){

        let player = new Player.Player()
        player.Name = data.Name
        player.Img_url = data.Appearance
        player.Class = data.Class
        player.Race = data.Race
        player.Alignment = data.Alignment
        player.Strenght = parseInt(data.Strenght)
        player.Dexterity = parseInt(data.Dexterity)
        player.Constitution = parseInt(data.Constitution)
        player.Intelligence = parseInt(data.Intelligence)
        player.Wisdom = parseInt(data.Wisdom)
        player.Charisma = parseInt(data.Charisma)
        player.Proficiency = parseInt(data.Proficiency_bonus)
        player.Experience = parseInt(data.Experience_points)

        Object.keys(data).forEach(key => {

            if (data[key] === 'on'){
                if(key.includes("saving_throw")){
                    player.SavingThrows.push(key)
                }
                else{
                    player.Skills.push(key)
                }
            }
        })

        return player
    }
}

module.exports = {
    PlayerFactory
}
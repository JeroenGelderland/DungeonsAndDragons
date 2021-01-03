import {D20} from "../dice/Dice.js";
export default class Creature {

    constructor(data){
        
        this.name = data.name
        this.dexterity = data.dexterity
        this.statusEffects = data.statusEffects
    }

    get dexterityModifier(){
        return Math.floor((this.dexterity - 10) / 2)
    }

    CheckDexterity(){
        return D20.roll() + this.dexterityModifier
    }
    
}

// import { proxyFactory } from '../../../server/helpers.js'

// export default class Creature {
//     constructor (data) {
//         this.Name = data.Name

//         this.Data = {
//             Img_url: data.Appearance,

//             Game: data.Game,

//             Level: 1,
//             Experience: parseInt(data.Experience_points || 0),
//             Class: data.Class,
//             Race: data.Race,
//             Alignment: data.Alignment,

//             Stats: {
//                 Strength:     parseInt(data.Strength),
//                 Dexterity:    parseInt(data.Dexterity),
//                 Constitution: parseInt(data.Constitution),
//                 Intelligence: parseInt(data.Intelligence),
//                 Wisdom:       parseInt(data.Wisdom),
//                 Charisma:     parseInt(data.Charisma)
//             },
//             Proficiency: parseInt(data.Proficiency_bonus),

//             Inspiration: false,

//             SavingThrows: "savingThrows" in data ? data.savingThrows : [],
//             Skills:       "skill"        in data ? data.skills       : []
//         }

//         this.Inventory = new Inventory()

//         this.Proficiency = proxyFactory(this.Data.Stats, v => Math.floor((v - 10) / 2), 0)
//     }
// }
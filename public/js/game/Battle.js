import Creature from "../models/Creature.js";
const COMBATTANTS = [new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pam", dexterity: 18, statusEffects: []}),new Creature({name: "pim", dexterity: 18, statusEffects: []}),new Creature({name: "pam", dexterity: 18, statusEffects: []}),new Creature({name: "pet", dexterity: 18, statusEffects: []})]

/*TODO:
    - fix double initiative    
*/
export default class Battle{
    

    constructor(combattants){
        this.battleSequence = this.ArrangeBattleSequence(combattants)
        this.currentCombattant = 0
    }

    ArrangeBattleSequence(combattants){
        let battleSequence = []
        combattants.forEach(combattant => {
            battleSequence.push(new Combattant(combattant))
        });

        battleSequence.sort((a, b) => (a.Intiative < b.Intiative) ? 1 : -1)

        return battleSequence        
    }
}


class Combattant{

    constructor(creature){
        this.creature = creature
        this.Intiative = this.GetInitative()
        this.inCombat = true
    }

    GetInitative(){
        return this.creature.CheckDexterity()
    }
}

new Battle(COMBATTANTS)

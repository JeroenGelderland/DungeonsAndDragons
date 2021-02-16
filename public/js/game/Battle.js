import Creature from "../models/Creature.js"

const COMBATANTS = [
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pam", dexterity: 18, statusEffects: []}),
    new Creature({name: "pim", dexterity: 18, statusEffects: []}),
    new Creature({name: "pam", dexterity: 18, statusEffects: []}),
    new Creature({name: "pet", dexterity: 18, statusEffects: []})
]

/* TODO:
    - fix double initiative    
*/

export default class Battle {

    constructor(combatants) {
        this.battleSequence = this.ArrangeBattleSequence(combatants)
        this.currentCombatant = 0
    }

    ArrangeBattleSequence(combatants) {
        let battleSequence = []
        combatants.forEach(combatant => {
            battleSequence.push(new Combatant(combatant))
        })

        battleSequence.sort((a, b) => (a.Initiative < b.Initiative) ? 1 : -1)

        return battleSequence
    }
}

class Combatant {

    constructor(creature) {
        this.creature = creature
        this.Initiative = this.GetInitiative()
        this.inCombat = true
    }

    GetInitiative() {
        return this.creature.CheckDexterity()
    }
}

new Battle(COMBATANTS)

/*

class obj {
  constructor(key, ini) {
    this.key = key
    this.rolls = []
    this.initiative = this.roll(ini)
  }
  roll (ini) {
    this.lastRoll = ini !== undefined ? ini : ~~(Math.random() * 20) + 1
    this.rolls.push(this.lastRoll)
    return this.lastRoll
  }
}

const initiatives = [
  new obj('a'),
  new obj('b'),
  new obj('c'),
  new obj('d'),
  new obj('e'),
  new obj('f'),
  new obj('g'),
  new obj('h'),
  new obj('i'),
  new obj('j'),
  new obj('k'),
  new obj('l'),
  new obj('m'),
  new obj('n'),
  new obj('o'),
  new obj('p'),
  new obj('q')
]

function sub (arr, start, end) {
  const subArr = arr.slice(start, end)
  subArr.forEach(player => player.roll())
  arr.splice(start, end - start, ...order(subArr))
}

function order (arr) {
	arr.sort((a, b) => a.lastRoll > b.lastRoll ? -1 : 1)

  let prev  = arr[0].lastRoll
  let start = -1

  for (let i = 1; i < arr.length; i++) {
    const that = arr[i]
    const curr = arr[i].lastRoll
 
    if (prev === curr) {
      if (start === -1) start = i - 1
      if (i === arr.length - 1) sub(arr, start, i + 1)
    } else if (start !== -1) {
    	sub(arr, start, i)
      start = -1
    }

    prev = curr
  }
  return arr
}

order(initiatives)

document.body.innerHTML = `<ul>${initiatives.map(v => `<li>${v.key}: ${v.initiative} <span>(${v.rolls.join(', ')})</span></li>`).join('')}</ul>`

*/
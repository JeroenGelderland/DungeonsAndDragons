import Creature from './Creature.js'

export default class Player extends Creature {
    constructor (data, Username) {
        super(data)
        this.Username = Username
    }

    ToJson () {
        return JSON.stringify(this)
    }
}
class Dice {

    constructor(eyes) {
        this.eyes = eyes
    }

    roll() {
        return Math.floor(Math.random() * this.eyes) + 1
    }
}

export const D4  = new Dice(4)
export const D6  = new Dice(6)
export const D8  = new Dice(8)
export const D10 = new Dice(10)
export const D12 = new Dice(12)
export const D20 = new Dice(20)
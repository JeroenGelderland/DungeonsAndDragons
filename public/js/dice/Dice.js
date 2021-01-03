class Dice{

    constructor(eyes){
        this.eyes = eyes
    }

    roll(){
        return Math.floor(Math.random() * Math.floor(this.eyes)) + 1
    }
}

export const D20 = new Dice(20) 
export const D6 = new Dice(6) 
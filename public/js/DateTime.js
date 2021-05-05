import FrontendDatabase from './database/frontendDatabase.js'

export default class DateTime {

    constructor(timestamp) {

        this.time = FrontendDatabase.data[window.game_id].time

        FrontendDatabase.Mutate
        FrontendDatabase[id]

        this.realDefinitions = this.time.definitions.reduce((accumulator, currentValue) => {

            if (currentValue.type !== "abstraction") accumulator[currentValue.unit] = currentValue
            return accumulator

        }, {})
        
        // console.log(this.realDefinitions)
        // console.log(60 * 60 * 24 * 30 * 12)
    }

    init() {
        
    }
}

FrontendDatabase.proxy[id].time = 10

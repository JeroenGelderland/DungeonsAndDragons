import fs from 'fs'

const DEFAULT_SOURCE = 'database.json'

export default class Database{

    constructor(src=DEFAULT_SOURCE){
        this.src = src
        this.data = this.load()
    }

    find(id){
        return [...this.data.games, ...this.data.characters, ...this.data.users, ...this.data.items].reduce((accumulator, currentValue) => 
        {
            accumulator[currentValue.id] = currentValue
            return accumulator
        }, {})[id]
    }

    mutate(mutation){
        let Entity = this.find(mutation.EntityId)
        mutation.OldValue = Entity[mutation.field]
        Entity[mutation.field] = mutation.NewValue
        this.save()
    }

    load(){
        return JSON.parse(fs.readFileSync(this.src, 'utf8'))
    }

    save(){
        fs.writeFile(this.src, JSON.stringify(this.data), (err) => {
            if (err) throw err
        })
    }
}


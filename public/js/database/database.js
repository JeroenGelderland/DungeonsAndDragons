export default class Database{


    Find(id){
        return [...this.data.games, ...this.data.characters, ...this.data.users, ...this.data.items].reduce((accumulator, currentValue) => 
        {
            accumulator[currentValue.id] = currentValue
            return accumulator
        }, {})[id]
    }

    Mutate(mutation){
        let Entity = this.find(mutation.EntityId)
        mutation.OldValue = Entity[mutation.field]
        Entity[mutation.field] = mutation.NewValue
        this.save()
    }

    load(){
        return 0
    }

    save(){
        return 0
    }
}


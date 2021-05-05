// Base
export default class Database{

    Mutate(mutation){
        let Entity = this.data[mutation.EntityId]
        mutation.OldValue = Entity[mutation.field]
        Entity[mutation.field] = mutation.NewValue
        this.save()
    }

    load(){
        console.log(this._data)
        this.data = new Proxy([ ...this._data.games, ...this._data.characters, ...this._data.users, ...this._data.items ].reduce((accumulator, currentValue) => {
            accumulator[currentValue.id] = currentValue
            return accumulator
        }, {}), {
            set (obj, key, val) {
                // extra functionaliteit
                obj[key] = val
            },
            get (obj, key) {
                // extra functionaliteit
                return obj[key]
            }
        })
        console.log(this.data)
    }

    save(){
        return 0
    }
}

// export default class Database{

//     Mutate(mutation){
//         let Entity = this.simple[mutation.EntityId]
//         mutation.OldValue = Entity[mutation.field]
//         Entity[mutation.field] = mutation.NewValue
//         this.save()
//     }

//     load(){
//         this.simple = [ ...this._data.games, ...this._data.characters, ...this._data.users, ...this._data.items ].reduce((accumulator, currentValue) => {
//             accumulator[currentValue.id] = currentValue
//             return accumulator
//         }, {})
//     }

//     save(){
//         return 0
//     }

//     Proxy(){
//         return new Proxy(this, {
//             set (obj, key, val) {
//                 obj.simple[key] = val
//             },
//             get (obj, key) {
//                 const direct = obj[key]
//                 if (direct) return direct
//                 return obj.simple[key]
//             }
//         })
//     }
// }


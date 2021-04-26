export default class Mutation {

    constructor(id ,EntityId, field, value) {
        this.Id = id                //client
        this.Time = new Date()      //server
        this.EntityId = EntityId    //client
        this.Field = field          //client
        this.NewValue = value       //client
        this.OldValue               //server
    }

    toJson(){
        return JSON.stringify(this)
    }
}
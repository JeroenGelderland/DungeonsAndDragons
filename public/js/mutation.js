export default class Mutation {

    constructor(EntityId, field, value) {
        this.Id = this.create_UUID()    
        this.EntityId = EntityId        
        this.Field = field              
        this.NewValue = value           
    }

    toJson() {
        return JSON.stringify(this)
    }

    create_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}
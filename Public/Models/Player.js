import {List} from "../Utils/List";

class Player {

    constructor(id, playerData) {
        this.id = id
        this.hp = playerData.hp
        this.items = this.createItemList()
    }

    TakeDamage(amount){
        this.hp.current -= amount
    }

    Heal(amount){
        this.hp.current + amount > this.hp.total ? this.hp.current = this.hp.total : this.hp.current += amount
    }

    AddItem(item){
        this.items.Add(item)
    }

    RemoveItem(item){
        this.items.Remove(item)
    }

    createItemList(itemArray){
        return new List(itemArray)
    }
}
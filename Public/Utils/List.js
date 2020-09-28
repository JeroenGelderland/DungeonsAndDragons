const AMOUNT_TO_BE_DELETED = 1

class List {

    constructor(content = []) {
        this.Array = content
    }

    Add(obj){
        if (this.check(obj))
            this.Array.push(obj)
    }

    Remove(obj){
        if (this.check(obj))
            this.Array.splice(this.Find(obj), AMOUNT_TO_BE_DELETED)
    }

    Find(obj){
        if (this.check(obj))
            return this.Array.indexOf(obj)
    }

    check(obj){
        if(obj != null){
            return true
        }
        console.error("Error object given is null")
        return false
    }

}
class Player {

    constructor() {

        this.Name = null
        this.Level = 1
        this.Race = null
        this.Img_url = "Images/placeholder.jpg"
        this.Experience = 0
        this.Alignment = null
        this.Class = null
        this.Inspiration = false

        this.Strenght = 0
        this.Dexterity = 0
        this.Constitution = 0
        this.Intelligence = 0
        this.Wisdom = 0
        this.Charisma = 0

        this.SavingThrows = []
        this.Skills = []

        this.Inventory = new Inventory()
    }



    PassivePerception(){
    //todo calc and return passive wisdom
    }

    ToJson(){
        return JSON.stringify(this)
    }
}
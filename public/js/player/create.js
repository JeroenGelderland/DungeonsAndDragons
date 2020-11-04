export class PlayerCreator {
    constructor ({ MIN, MAX, races, classes }) {
        Object.assign(this, arguments)
    }

    fillSelect (id, content_array) {
        content_array.forEach(r => {
            const option = document.createElement('option')
            option.value = r
            option.innerText = r
            document.getElementById(id).appendChild(option)
        })
    }

    load () {
        fetch('http://' + window.location.host + '/games').then(r => r.json()).then(games => {
            this.fillSelect('select-game-list', games.map(g => g.Name))
        })
        this.fillSelect('select-race-list', this.races)
        this.fillSelect('select-class-list', this.classes)
    }
}

const races = [ 'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 'Half-Orc', 'Human', 'Teifling', 'Orc of Exandria', 'Leonin', 'Satyr', 'Aarakocra', 'Genasi', 'Goliath', 'Aasimar', 'Bugbear', 'Firbolg', 'Goblin', 'Hobgoblin', 'Kenku', 'Kobold', 'Lizardfolk', 'Orc', 'Tabaxi', 'Triton', 'Yuan-ti Pureblood', 'Feral Tiefling', 'Tortle', 'Changeling', 'Kalashtar', 'Orc of Eberron', 'Shifter', 'Warforged', 'Gith', 'Centaur', 'Loxodon', 'Minotaur', 'Simic Hybrid', 'Vedalken', 'Verdan', 'Locathah', 'Grung' ]
const classes = [ 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter','Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard', 'Artificer', 'Blood Hunter' ]
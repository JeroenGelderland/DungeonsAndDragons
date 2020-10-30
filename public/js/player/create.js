const MIN = 0
const MAX = 20
const races =["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc", "Human", "Teifling", "Orc of Exandria", "Leonin", "Satyr", "Aarakocra", "Genasi", "Goliath", "Aasimar", "Bugbear", "Firbolg", "Goblin", "Hobgoblin", "Kenku", "Kobold", "Lizardfolk", "Orc", "Tabaxi", "Triton", "Yuan-ti Pureblood", "Feral Tiefling", "Tortle", "Changeling", "Kalashtar", "Orc of Eberron", "Shifter", "Warforged", "Gith", "Centaur", "Loxodon", "Minotaur", "Simic Hybrid", "Vedalken", "Verdan", "Locathah", "Grung"]
const classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter","Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Artificer", "Blood Hunter"]


fillSelect("select-race-list", races)
fillSelect("select-class-list", classes)

fetch("http://" + window.location.host + "/games").then(r => r.json()).then(games => {
    games = DATABASE.GetData().games.map(g => g.Name)
    fillSelect("select-game-list", games)
})

function fillSelect(id, content_array){
    content_array.forEach(r => {
        const option = document.createElement("option")
        option.value = r
        option.innerText = r
        document.getElementById(id).appendChild(option)
    })
}

document.querySelectorAll("input[type='number']").forEach(input => {
    input.value = 0
    input.min = MIN
    input.max = MAX
})

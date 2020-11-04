import { PlayerCreatorPageLoader } from '/js/player/create.js'

const playerCreatorPageLoader = new PlayerCreatorPageLoader({
  races: [
    'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 'Half-Orc', 'Human', 'Teifling',
    'Orc of Exandria', 'Leonin', 'Satyr', 'Aarakocra', 'Genasi', 'Goliath', 'Aasimar', 'Bugbear',
    'Firbolg', 'Goblin', 'Hobgoblin', 'Kenku', 'Kobold', 'Lizardfolk', 'Orc', 'Tabaxi', 'Triton',
    'Yuan-ti Pureblood', 'Feral Tiefling', 'Tortle', 'Changeling', 'Kalashtar', 'Orc of Eberron', 
    'Shifter', 'Warforged', 'Gith', 'Centaur', 'Loxodon', 'Minotaur', 'Simic Hybrid', 'Vedalken',
    'Verdan', 'Locathah', 'Grung'
  ],
  classes: [
    'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue',
    'Sorcerer', 'Warlock', 'Wizard', 'Artificer', 'Blood Hunter'
  ]
})

playerCreatorPageLoader.load()
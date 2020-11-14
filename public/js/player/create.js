export default class PlayerCreatorPageLoader {
    constructor ({ races, classes }) {
        Object.assign(this, ...arguments)
    }

    fillSelect (id, content_array) {
        const fragment = document.createDocumentFragment()

        content_array.forEach(r => {
            const option = document.createElement('option')
            option.value = r
            option.innerText = r
            fragment.appendChild(option)
        })

        document.getElementById(id).appendChild(fragment)
    }

    load () {
        fetch('http://' + window.location.host + '/games').then(r => r.json()).then(games => {
            this.fillSelect('select-game-list', games.map(g => g.Name))
        })
        this.fillSelect('select-race-list', this.races)
        this.fillSelect('select-class-list', this.classes)
    }
}
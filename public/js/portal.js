const GAME_LIST = document.getElementById("game-list")
const PLAYER_LIST = document.getElementById("player-list")
const CREATE_PLAYER_BUTTON = document.getElementById("create-player")

fetch("/user").then(r => r.json().then(user => {

    fetch("/games").then(r => r.json()).then(games => {
        games.forEach(game => {
            console.log(game)

            if (game.Users.includes(user)) {
                const list_item_game = document.createElement("li")

                list_item_game.addEventListener('click', () => {
                    PLAYER_LIST.innerHTML = null
                    document.querySelector("body > div:last-of-type").style.display = "block"
                    game.Players.forEach(player => {
                        if (player.User === user) {
                            const list_item_player = document.createElement("li")
                            list_item_player.addEventListener("click", () => {
                                window.localStorage["game"] = JSON.stringify({name: game.Name, player: player.Name})
                                window.location = "/game.dashboard"
                            })
                            list_item_player.innerHTML = `<span>${player.Name}</span>`
                            PLAYER_LIST.appendChild(list_item_player)
                        }
                    })
                })
                list_item_game.innerHTML = `<span>${game.Name}</span>`
                console.log(game.Name)
                GAME_LIST.appendChild(list_item_game)
            }
        })
    })
}))

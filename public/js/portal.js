const GAME_LIST = document.getElementById("game-list")
const PLAYER_LIST = document.getElementById("player-list")
GAME_LIST.style.background = "red"
PLAYER_LIST.style.background = "yellow"

console.log( window.location.host+"/games" )
fetch("http://" + window.location.host + "/games").then(r => r.json()).then(games => {
    games.forEach(game => {
            const list_item_game = document.createElement("li")
            list_item_game.addEventListener('click', () => {

                PLAYER_LIST.innerHTML = null
                game.Players.forEach(player => {
                    const list_item_player = document.createElement("li")
                    list_item_player.addEventListener("click", () => {
                        console.log(game.Name, player.Name)
                    })
                    list_item_player.innerHTML = `<span>${player.Name}</span>`
                    PLAYER_LIST.appendChild(list_item_player)
                })


        })
        list_item_game.innerHTML = `<span>${game.Name}</span>`
        console.log(game.Name)
        GAME_LIST.appendChild(list_item_game)    })
})


class Session {

    constructor(data) {
        this.data = data
        document.getElementById("create-new-game").addEventListener("click", e => {
            HideAllSections()
            window.location = "./createPlayer.php"
        })

        this.setGame()
    }

    setGame(){
        document.getElementById("pick-game").style.display = "block"

        let gameList = document.getElementById("game-list")
        gameList.innerHTML = ""
        this.data.games.forEach(game => {
            let gameElement = document.createElement("li")
            gameElement.innerText = game.name
            gameElement.addEventListener("click", e => {
                window.localStorage.setItem(GAME_KEY, JSON.stringify(game))
                document.getElementById("pick-game").style.display = "none"
                this.setPlayer(game.players)
            })
            gameList.appendChild(gameElement)
        })
    }

    setPlayer(players){
        document.getElementById("pick-player").style.display = "block"


        let playerList = document.getElementById("player-list")
        playerList.innerHTML = ""
        players.forEach(player => {
            let playerElement = document.createElement("li")
            playerElement.innerText = player.name
            playerElement.addEventListener("click", e => {
                window.localStorage.setItem(PLAYER_KEY, JSON.stringify(player))
                document.getElementById("pick-player").style.display = "none"
            })

            playerList.appendChild(playerElement)
        })
    }
}
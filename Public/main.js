const SOCKET = io('http://localhost:3100')

SOCKET.emit('user-connected')

SOCKET.on('user-connected', name => {
    if(name !== null){
        alert(name + " joined")
    }
})

SOCKET.on('user-disconnected', name => {
    if(name !== null){
        alert(name + " left")
    }
})

SOCKET.on('init', games => {

    let gameList = document.querySelector("#pick_game > ul")
    let userList = document.querySelector("#pick_user > ul")

    choice = {}

    games.forEach(game => {
        gameListItem = document.createElement("li")
        gameListItem.innerHTML = game.naam
        gameListItem.addEventListener("click", e => {

            document.querySelector("#pick_game").style.display = "none"
            choice.game = game.naam

            game.users.forEach(user => {

                userListItem = document.createElement("li")
                userListItem.innerHTML = user.naam
                userListItem.addEventListener("click", e => {

                    document.querySelector("#pick_user").style.display = "none"
                    choice.user = user.naam
                    SOCKET.emit("pick-game", choice)
                })
                userList.appendChild(userListItem)
            })
        })
        gameList.appendChild(gameListItem)
    });


})






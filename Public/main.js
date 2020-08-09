const SOCKET = io('http://localhost:3100')

SOCKET.emit('user-connected')

SOCKET.on('user-connected', name => {
    if(name !== null){
        alert(name + ' joined')
    }
})

SOCKET.on('user-disconnected', name => {
    if(name !== null){
        alert(name + ' left')
    }
})

SOCKET.on('init', everything => {

    let gameList = document.querySelector('#pick_game > ul')
    let userList = document.querySelector('#pick_user > ul')

    choice = {}

    const USERS = everything.users
    const GAMES = everything.games

    for (const [ name, game ] of Object.entries(GAMES)) {
        gameListItem = document.createElement('li')
        gameListItem.innerHTML = name
        gameListItem.addEventListener('click', e => {

            document.querySelector('#pick_game').style.display = 'none'
            choice.game = name

            game.users.forEach(userID => {

                userListItem = document.createElement('li')
                const USER = USERS[userID]
                userListItem.innerHTML = USER.name
                userListItem.addEventListener('click', e => {

                    document.querySelector('#pick_user').style.display = 'none'
                    choice.user = userID
                    SOCKET.emit('pick-game', choice)
                })
                userList.appendChild(userListItem)
            })
        })
        gameList.appendChild(gameListItem)
    }

})






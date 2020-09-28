class GameHandler {

    GetGamesWhereDM(userId, games){
        let DmGames = new List()
        let gameKeys = Object.keys(games)
        for (let i = 0; i < gameKeys.length; i++){
            if(games[gameKeys[i]].dm == userId){
                DmGames.Add(games[gameKeys[i]])
            }
        }
        return DmGames
    }

    GetGamesWherePlayer(userId, games){
        let PlayerGames = new List()
        let gameKeys = Object.keys(games)
        for (let i = 0; i < gameKeys.length; i++){
            games[gameKeys[i]].players.forEach(player => {
                if(player == userId){
                    PlayerGames.Add(games[gameKeys[i]])
                }
            })
            }

        return PlayerGames
    }

}
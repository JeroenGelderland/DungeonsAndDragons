class PlayerFactory {
    static create_player(){
        return new Player()
    }

    static create_player(data){
        let player = new Player()
        //todo add data to player
        return player
    }

}
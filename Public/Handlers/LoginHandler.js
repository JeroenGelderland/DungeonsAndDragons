const LOGIN = document.getElementById("login");

class LoginHandler {

    constructor(SOCKET) {
        localStorage.removeItem("user")
        this.SOCKET = SOCKET
        LOGIN.style.display = "block"
        LOGIN.addEventListener("submit", e => {
            this.login(e)

        })


        this.SOCKET.on("login-attempt-failed", () => {
            LOGIN.style.display = "block"
            LOGIN.classList.toggle("active")
            console.log("nee")
        })

        this.SOCKET.on("login-attempt-succes", id => {
            this.storeUser(id)
            LOGIN.style.display = "none"
            SOCKET.emit("start", this.username)
        })
    }

    storeUser(id){
        localStorage.setItem("user", id)
    }

    login(event) {
        event.preventDefault();
        this.username = document.getElementById("user-name").value
        this.SOCKET.emit('login-attempt', this.username)
    }


}
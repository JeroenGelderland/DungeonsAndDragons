document.getElementById("game-name").addEventListener("input", e => {
    check_if_duplicate(e.target.value, e.target)
})

function check_if_duplicate(input_name, target) {
    fetch("http://" + window.location.host + "/data").then(r => r.json()).then(data => {

        showError(data.games.find(game => game.Name == input_name) != null, target)
    })
}

function showError(bool, target) {
    if (bool) {
        target.style.background = "red"
        target.value = ""
    } else {
        target.style.background = "white"
    }
}
const MIN = 0
const MAX = 20

fetch("http://"+window.location.host+"/data").then(r => r.json()).then(data => {
    let select = document.getElementById("select-game-list")
    data.games.forEach(obj => {
        let option = document.createElement("option")
        option.innerText = obj.Name
        select.appendChild(option)
    })})

document.querySelectorAll("input[type='number']").forEach(input => {
    input.value = 0
    input.min = MIN
    input.max = MAX
})


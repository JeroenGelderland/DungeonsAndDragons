function fetchOptions(url, select) {
    fetch(url).then(r => r.json()).then(json =>  {
        console.log(json.results)
        json.results.forEach(obj => {
            let option = document.createElement("option")
            option.value = obj.index
            option.innerText = obj.name
            select.appendChild(option)
        })
    })
}

fetchOptions("https://www.dnd5eapi.co/api/classes", document.getElementById("select-class-list"))
fetchOptions("https://www.dnd5eapi.co/api/races", document.getElementById("select-race-list"))


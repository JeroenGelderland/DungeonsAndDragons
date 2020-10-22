const SOCKET = io('http://localhost:3100')

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()

    let obj = {}
    obj.Type = document.querySelector("type").innerHTML
    document.querySelectorAll("input, select, textarea").forEach(i => {
        if(i.name != ""){
            obj[i.name] = i.value;
        }

    })


    console.log(obj)
    SOCKET.emit("CREATE", obj)
})

//TODO image handeling
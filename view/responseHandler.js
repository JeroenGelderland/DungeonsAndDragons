const FS = require("fs")

const ROOT = __dirname

function RES_error() {
    return {
        head: {
            title: 'Error'
        },
        body: {
            main: {
                html: "<p>Something went wrong :(</p>"
            }
        },
        request: {
            status: 500,
        }

    }
}

function RES_readFile(path){
    FS.readFileSync(path, "utf8").replace(/\"/g,  "'")
}

function RES_Login() {
    try {
        const HTML = RES_readFile(`${ROOT}/login.html`)

        return {
            head: {
                title: 'DnD login'
            },
            body: {
                main: {
                    html: HTML
                }
            },
            request: {
                status: 200,
                pathname: "/login"
            }

        }
    } catch (e) {
        return RES_Error()
    }
}

module.exports = {
    RES_Login
}
const FS = require('fs')

const ROOT = __dirname

function RES_error() {
    return {
        head: {
            title: 'Error'
        },
        body: {
            main: {
                html: '<p>Something went wrong :(</p>'
            }
        },
        request: {
            status: 500,
        }

    }
}

function RES_readFile(path){
    let file_content = FS.readFileSync(path, 'utf8')
    file_content = file_content.replace(/\"/g,  '\'')
    file_content = file_content.replace(/\n|\r/g,  '')
    file_content = file_content.replace(/\s{2}/g,  '')

    return file_content
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
                pathname: '/login'
            }

        }
    } catch (e) {
        return RES_Error()
    }
}

function RES_Portal() {
    try {
        const HTML = RES_readFile(`${ROOT}/portal.html`)

        return {
            head: {
                title: 'DnD portal'
            },
            body: {
                main: {
                    html: HTML
                }
            },
            request: {
                status: 200,
                pathname: '/portal'
            }
        }
    } catch (e) {
        return RES_Error()
    }
}

function RES_PlayerCreate() {
    try {
        const HTML = RES_readFile(`${ROOT}/player/create.html`)

        return {
            head: {
                title: 'create player'
            },
            body: {
                main: {
                    html: HTML
                }
            },
            request: {
                status: 200,
                pathname: '/player.create'
            }
        }
    } catch (e) {
        return RES_Error()
    }
}
function RES_GameCreate() {
    try {
        const HTML = RES_readFile(`${ROOT}/game/create.html`)

        return {
            head: {
                title: 'create game'
            },
            body: {
                main: {
                    html: HTML
                }
            },
            request: {
                status: 200,
                pathname: '/game.create'
            }
        }
    } catch (e) {
        return RES_Error()
    }
}


module.exports = {
    RES_Login,
    RES_Portal,
    RES_GameCreate,
    RES_PlayerCreate
}
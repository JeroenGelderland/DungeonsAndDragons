import fs from 'fs'

const ROOT = './view'

const constructFile = (partial, data) => {
    return `
<html>
    <head>
        <title>${data.head.title}</title>
    <head>
    <body>
        ${partial}
    <body>
<html>`
}

const sender = (req, res, status, data, partial) => {
    res.status(200)

    if (req.xhr) {
        data.body.main.html = partial
        res.json(data)
    } else {
        res.set('Content-Type', 'text/html')
        res.send(Buffer.from(constructFile(partial, data)))
    }
}

const readJSON = (path) => {
    try {
        let file_content = fs.readFileSync(path, 'utf8')
        return JSON.parse(file_content)
    } catch (e) {
        return null
    }
}

const readHTML = (path) => {
    try {
        let file_content = fs.readFileSync(path, 'utf8')
        file_content = file_content.replace(/\"/g,  '\'')
        file_content = file_content.replace(/[\n\r]/g,  '')
        file_content = file_content.replace(/\s{2}/g,  '')

        return file_content
    } catch (e) {
        return null
    }
}

export default new Proxy({}, {
    get: (target, val) => {
        if (!fs.existsSync(`${ROOT}/${val}`)) val = 'not-found'

        let data = readJSON(`${ROOT}/${val}/data.json`)

        const getter = (req, res) => {
            const html = readHTML(`${ROOT}/${val}/partial.html`)
            sender(req, res, status, data, html)
        }

        const defaultPoster = (req, res) => {
            status = 500
            val    = 'error'
            data   = readJSON(`${ROOT}/${val}/data.json`)
            getter()
        }

        const actions = {
            getter,
            poster: defaultPoster
        }

        let status

        switch (val) {
            case 'not-found':
                status = 404
                break
            case 'error':
                status = 500
                break
            default:
                status = 200
                actions.poster = async (req, res, next) => {
                    const poster = await import(`${ROOT}${val}poster.js`)
                    const result = poster(req, res, getter, next)
                }
                break
        }
        return actions
    }
})

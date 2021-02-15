export default (req, res, fail, success) => {
    const login_attempt = login(req.body, req)

    if (login_attempt.status) {
        res.status(200).redirect('/portal')
    } else {
        res.status(401).redirect('/login')
    }
}

function login (login_attempt, req) {
    const user = DATABASE.getUserByName(login_attempt.username)

    if (user === null) return { status: false, message: 'user not found' }
    if (user.password !== login_attempt.password) return { status: false, message: 'incorrect password' }

    req.session.user = user.username
    return { status: true, message: 'success' }
}
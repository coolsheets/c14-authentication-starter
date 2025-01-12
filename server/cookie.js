const MINUTES = 60*1000

export function loginCookie(req, res) {
    const { username, password } = req.body

    // check username and password
    if (!password === '123456') {
        res.sendStatus(401)
        return
    }

    res.cookie('session', username, {
        httpOnly: true,
        maxAge: 5*MINUTES
    })

    res.sendStatus(200)
} 

export function publicAccessAllowed(req, res, next) {
    if (req.cookies.session) {
        // in industry this cookie would be parsed.
        const userName = req.cookies.session
        req.user = userName
    }
    next();
}

export function authRequired(req, res, next) {
    if (!req.cookies.session) {
        // say no
        res.sendStatus(401)
        return
    }
    // in industry this cookie would be parsed and the user looked up
    const userName = req.cookies.session
    req.user = userName
    next()
}

export function logoutCookie(req, res) {
    res.clearCookie('session')
    res.sendStatus(200)
}


export function requestBasicLoginIfRequired(req, res, next) {
    // send back 401 if there is no authentication header
    if (!req.headers['authorization']) {
        console.log('No authorization header present, responding with 401 and WWW-Authenticate')
        res.set('WWW-Authenticate', 'Basic')
        res.sendStatus(401)
        return
    }

    const authorization = req.headers['authorization']
    const [scheme, credential] = authorization.split(' ')
    if (scheme !== 'Basic') {
        res.set('WWW-Authenticate', 'Basic')
        res.sendStatus(401)
        return
    }

    const usernamePassword = Buffer.from(credential, 'base64').toString()
    const [username, password] = usernamePassword.split(':')

    // do the check here!
    console.log('Check', username, 'with password', password)

    // return 401 if the credentals are bad!
    if (password !== "123456") {
        res.sendStatus(401)
        return
    }

    req.user = username
    
    next()
}

export function requireBasicAuth(req, res, next) {
    // send back 401 if there is no authentication header
    if (!req.headers['authorization']) {
        console.log('No authorization header present, responding with 401')
        res.sendStatus(401)
        return
    }
    const authorization = req.headers['authorization']
    const [scheme, credential] = authorization.split(' ')
    if (scheme !== 'Basic') {
        res.set('WWW-Authenticate', 'Basic')
        res.sendStatus(401)
        return
    }
    const usernamePassword = Buffer.from(credential, 'base64').toString()
    const [username, password] = usernamePassword.split(':')

    // do the check here!
    console.log('Check', username, 'with password', password)
    // return 401 if the credentals are bad!
    if (password !== "123456") {
        res.sendStatus(401)
        return
    }

    req.user = username    
    next()
}

export function publicAccessAllowed(req, res, next) {
    // authorization is optional
    if (req.headers['authorization']) {
        const authorization = req.headers['authorization']
        const [scheme, credential] = authorization.split(' ')
        if (scheme !== 'Basic') {
            res.set('WWW-Authenticate', 'Basic')
            res.sendStatus(401)
            return
        }
        const usernamePassword = Buffer.from(credential, 'base64').toString()
        const [username, password] = usernamePassword.split(':')
    
        // do the check here!
        console.log('Check', username, 'with password', password)
        // return 401 if the credentals are bad!
        if (password !== "123456") {
            res.sendStatus(401)
            return
        }
        req.user = username    
    }
    next()
}

export function logoutBasic(req, res) {
    // tell the browser that the credentials they supplied arent good anymore
    // but DO NOT ask them to try to authenticate the user
    console.log('Responding with 401 without inviting new Authentication credentials')
    res.sendStatus(401)
}
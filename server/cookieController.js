import {Router} from 'express'
import { loginCookie, authRequired, publicAccessAllowed, logoutCookie } from './cookie.js'

const router = Router()

router.get('/currentUser', publicAccessAllowed, (req, res) => {
    res.send(req.user || '')    
})

router.post('/login', loginCookie) 

router.get('/balance', authRequired, (req, res) => {
    console.log('Getting balance for user', req.user)
    res.send({name: 'checking', balance: 521.00, date: new Date() })
})

router.get('/logout', logoutCookie)

export default router
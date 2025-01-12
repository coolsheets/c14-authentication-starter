import {Router} from 'express'
import { requestBasicLoginIfRequired, logoutBasic, publicAccessAllowed } from './basic.js'

const router = Router()

router.get('/currentUser', publicAccessAllowed, (req, res) => {
    res.send(req.user || '')    
})

router.get('/login', requestBasicLoginIfRequired, (req, res) => {
    res.sendStatus(200)
}) 

router.get('/balance', requestBasicLoginIfRequired, (req, res) => {
    console.log('Getting balance for user', req.user)
    res.send({name: 'checking', balance: 521.00, date: new Date() })
})

router.get('/logout', logoutBasic)

export default router
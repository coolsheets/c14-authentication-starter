import {Router} from 'express'
import { requireBasicAuth, logoutBasic } from './basic.js'

const router = Router()

router.use(requireBasicAuth)

router.get('/login', (req, res)=> {
    // if you got here... you survived the authentication check!
    res.sendStatus(200)
})

router.get('/balance', (req, res) => {
    console.log('Getting balance for user', req.user)
    res.send({name: 'checking', balance: 521.00, date: new Date() })
})

// notice no logout, the browser just forgets the credentials!

export default router
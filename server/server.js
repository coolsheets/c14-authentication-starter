import express from 'express'
import showRequests from './showRequests.js'
import cookieParser from 'cookie-parser'

import basicController from './basicController.js'
import formBasicController from './formBasicController.js'
import cookieController from './cookieController.js'

const PORT = process.env.PORT || 3000
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'C00k13$3cr3t'

const app = express()

app.use(showRequests)
app.use(express.json())
app.use(cookieParser(COOKIE_SECRET))

app.use(express.static('../client'))

app.use('/basic', basicController)
app.use('/formbasic', formBasicController)
app.use('/cookie', cookieController)

app.listen(PORT, () => {
    console.log('App is listening on port', PORT)
})
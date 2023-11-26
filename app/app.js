const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('./logger')

const dotenv = require('dotenv')
dotenv.config()

const app = express()
module.exports = app

app.use(express.urlencoded())

app.use(express.json())

app.use(cookieParser())

app.use(logger)

app.get('/', (req, res)=>{
    res.send('this is home page')
})


// mini apps
const userRouter = require('./routers/userRouter')
// const authRouter = require('./routers/authRouter')
const planRouter = require('./routers/planRouter')
const reviewRouter = require('./routers/reviewRouter')
const bookingRouter = require('./routers/bookingRouter')

// base routes
app.use('/user', userRouter)    // base route - '/user'
// app.use('/auth', authRouter)
app.use('/plan', planRouter)
app.use('/review', reviewRouter)
app.use('/booking', bookingRouter)

app.use((req, res)=>{
    res.status(404).send({
        message: '404 url not found'
    })
})

const port = process.env.PORT || 3000
const host = '0.0.0.0'

// running the server
app.listen(port, host, ()=>{
    console.log(`[+] server running on http://${host}:${port}`)
})

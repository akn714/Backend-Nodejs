const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('./logger')

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

// running the server
app.listen(3000, ()=>{
    console.log('[+] server listening on port 3000')
})

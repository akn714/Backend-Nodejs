const express = require('express')
const cookieParser = require('cookie-parser')
const log = require('./logger')

const app = express()
module.exports = app

app.use(express.urlencoded())

app.use(express.json())

app.use(cookieParser())

app.get('/', log, (req, res)=>{
    res.send('this is home page')
})


// mini apps
const userRouter = require('./routers/userRouter')
// const authRouter = require('./routers/authRouter')

// base routes
app.use('/user', userRouter)    // base route - '/user'
// app.use('/auth', authRouter)

app.get('*', log, (req, res)=>{
    res.send({
        message: '404 url not found'
    })
})

// running the server
app.listen(3000, ()=>{
    console.log('[+] server listening on port 3000')
})

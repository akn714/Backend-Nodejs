const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())

app.use(cookieParser())

app.get('/', (req, res)=>{
    res.send('this is home page')
})

// dummy users
let users = [
    {
        "id":1,
        "name":"abc"
    },
    {
        "id":2,
        "name":"xyz"
    },
    {
        "id":3,
        "name":"pqr"
    }
];


// mini apps
const userRouter = require('./routers/userRouter')
const authRouter = require('./routers/authRouter')

// base routes
app.use('/user', userRouter)    // base route - '/user'
app.use('/auth', authRouter)



// routes of miniapp - authRouter




// middlewares


// ####### CURD operations in MongoDB



// cookies

// running the server
app.listen(3000, ()=>{
    console.log('[+] server listening on port 3000')
})

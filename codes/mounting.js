const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('this is home page')
})

// mini apps
const userRouter = express.Router();
const authRouter = express.Router();

// base routes
app.use('/user', userRouter)    // base route - '/user'
app.use('/auth', authRouter)

const userRouterFunctions = require('./user router functions')

userRouter
.route('/')     // this means the route is '/user/'
.get(userRouterFunctions.getUser)
.post(userRouterFunctions.postUser)
.patch(userRouterFunctions.updateUser)
.delete(userRouterFunctions.deleteUser)

userRouter
.route('/:id')  // this means the route is '/user/:id'
.get(userRouterFunctions.getUserById)

const authRouterFunctions = require('./auth router functions')

authRouter
.route('/signup')
.get(authRouterFunctions.getSignUp)
.post(authRouterFunctions.postSignUp)

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

app.listen(3000, ()=>{
    console.log('server listening on port 3000')
})
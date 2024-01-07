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
.get(middleware1, getSignUp, middleware2)
.post(authRouterFunctions.postSignUp)

function getSignUp(req, res, next){
    console.log('getting signup page')
    // res.sendFile(__dirname+'/public/index.html')
    next()
}

function middleware1(req, res, next){
    console.log('middleware1 encountered');
    next();
}
function middleware2(req, res, next){
    console.log('middleware2 encountered');
    res.sendFile(__dirname+'/public/index.html')
}

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
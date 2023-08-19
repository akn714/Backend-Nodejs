const express = require('express')
const userModel = require('./models/userModel')

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
.get(getUser)
.post(userRouterFunctions.postUser)
.patch(updateUser)
.delete(userRouterFunctions.deleteUser)

userRouter
.route('/:id')  // this means the route is '/user/:id'
.get(userRouterFunctions.getUserById)

authRouter
.route('/signup')
.get(middleware1, getSignUp, middleware2)
.post(postSignUp)

function getSignUp(req, res, next){
    console.log('[+] getting signup page')
    // res.sendFile(__dirname+'/public/index.html')
    next()
}
async function postSignUp(req, res){
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword

    let data = await userModel.create(req.body)

    console.log('[+] from postSignUp', req.body)
    res.send({
        "msg":"user signed up",
        "user":data
    })
}

function middleware1(req, res, next){
    console.log('[+] middleware1 encountered');
    next();
}
function middleware2(req, res, next){
    console.log('[+] middleware2 encountered');
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
    console.log('[+] server listening on port 3000')
})

const dotenv = require('dotenv')
dotenv.config()





// (async function createUser(){
//     let user = {
//         name:"mario5",
//         email:"mario5@cartoon.com",
//         password:"abcd1234",
//         confirmPassword:"abcd1234"
//     }

//     let data = await userModel.create(user);
//     console.log(data)
// })()





// ####### CURD operations in MongoDB
async function getUser(req, res){
    let users = await userModel.find()
    res.json({
        "msg":"all users fetched",
        "users":users
    });
}

async function updateUser(req, res){
    let user = await userModel.findOneAndUpdate({'email':'mario@cartoon.com'}, {'name':'mario cartoon'});
    res.json({
        "res":'data updated successfully',
        "users":users
    })
}
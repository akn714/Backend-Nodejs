const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('this is home page')
})

const userRouter = express.Router();
app.use('/user', userRouter)    // base route - '/user'

userRouter
.route('/')     // this means the route is '/user/'
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')  // this means the route is '/user/:id'
.get(getUserById)


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

function getUser(req, res){
    res.send(users);
}

function postUser(req, res){
    // res.send(users);
    console.log(req.body)
    users = req.body
    res.json({
        "res":"data received successfully",
        "user":req.body.name
    })
}

function updateUser(req, res){
    console.log('req.body -> ', req.body)
    for(key in req.body){
        users[key] = req.body[key]
    }
    res.json({
        "res":'data updated successfully',
        "users":users
    })
}

function deleteUser(req, res){
    users = {}
    res.json({
        "res":'data delete successfully',
        "users":users
    })
}

function getUserById(req, res){
    console.log(req.params.id)
    console.log(req.params)
    let obj = {}
    for(let i=0;i<users.length;i++){
        if(users[i].id==req.params.id){
            obj = users[i]
        }
    }
    res.json({
        "user":obj
    })
}

app.listen(3000, ()=>{
    console.log('server listening on port 3000')
})
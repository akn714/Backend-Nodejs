const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('this is home page')
})

let users = {};

app.get('/users', (req, res)=>{
    res.send(users);
})

app.post('/users', (req, res)=>{
    // res.send(users);
    console.log(req.body)
    users = req.body
    res.json({
        "res":"data received successfully",
        "user":req.body.name
    })
})

app.patch('/users', (req, res)=>{
    console.log('req.body -> ', req.body)
    for(key in req.body){
        users[key] = req.body[key]
    }
    res.json({
        "res":'data updated successfully',
        "users":users
    })
})

app.delete('/users', (req, res)=>{
    users = {}
    res.json({
        "res":'data delete successfully',
        "users":users
    })
})

app.listen(3000, ()=>{
    console.log('server listening on port 3000')
})
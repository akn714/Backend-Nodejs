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
    res.json({
        "res":"data received sucessfully"
    })
})

app.listen(3000, ()=>{
    console.log('server listening on port 3000')
})
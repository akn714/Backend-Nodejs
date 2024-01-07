const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('this is home page')
})

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

app.get('/users', (req, res)=>{
    console.log(req.query);     // ../?name=abc&age=xyz
    res.send(users);
})

app.get('/users/:id', (req, res)=>{
    console.log(req.params.id)
    console.log(req.params)
    res.json({
        "id":req.params.id
    })
})

app.listen(3000, ()=>{
    console.log('server listening on port 3000')
})
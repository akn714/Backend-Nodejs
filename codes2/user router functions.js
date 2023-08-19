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
    res.send('asdasf');
}

function postUser(req, res){
    // res.send(users);
    // console.log(req.body)
    users = req.body
    res.json({
        "res":"data received successfully",
        "user":req.body.name
    })
}

function updateUser(req, res){
    // console.log('req.body -> ', req.body)
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
    // console.log(req.params.id)
    // console.log(req.params)
    let obj = {}
    for(let i=0;i<users.length;i++){
        if(users[i].id==req.params.id){
            obj = users[i]
        }
    }
    res.json({
        "user":"lol"
    })
}

module.exports = {
    "getUser":getUser,
    "postUser":postUser,
    "updateUser":updateUser,
    "deleteUser":deleteUser,
    "getUserById":getUserById
}
function getSignUp(req, res){
    res.sendFile(__dirname+'/public/index.html')
}

function postSignUp(req, res){
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password

    console.log(req.body)
    res.send({
        "msg":"user signed up",
        "user":req.body
    })
}

module.exports = {
    "getSignUp":getSignUp,
    "postSignUp":postSignUp
}
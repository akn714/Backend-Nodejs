const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const keys = require('../sescrets')


module.exports.postUser = function postUser(req, res){
    // res.send(users);
    // console.log(req.body)
    users = req.body
    res.json({
        "res":"data received successfully",
        "user":req.body.name
    })
}

module.exports.getUsers = async function getUsers(req, res) {
    let users = await userModel.find()
    res.json({
        "msg": "all users fetched",
        "users": users
    });
}

module.exports.updateUser = async function updateUser(req, res) {
    let user = await userModel.findOneAndUpdate({ 'email': 'mario@cartoon.com' }, { 'name': 'mario cartoon' });
    res.json({
        "res": 'data updated successfully',
        "users": user
    })
}

module.exports.deleteUser = function deleteUser(req, res){
    users = {}
    res.json({
        "res":'data delete successfully',
        "users":users
    })
}

module.exports.getUserById = async function getUserById(req, res){
    // console.log(req.params.id)
    // console.log(req.params)
    let user;
    try {
        user = await userModel.findOne({'_id':req.params.id});
    } catch (error) {
        return res.redirect('/')
    }
    let obj = {}
    for(let i=0;i<users.length;i++){
        if(users[i].id==req.params.id){
            obj = users[i]
        }
    }
    res.json({
        "user": user
    })
}

module.exports.protect_middleware = function protect_middleware(req, res, next) {
    try {
        if (!req.cookies.login) {
            return res.redirect('/auth/login');
        }
        else {
            let isVerified = jwt.verify(req.cookies.login, keys.JWT_KEY);
            if (isVerified) {
                next();
            }
            else {
                return res.json({
                    message: 'User not verified'
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}

module.exports.protected_route = function protected_route(req, res, next) {
    try {
        res.send({
            message: 'only logged in users can view this key',
            dummy_secret_key: 'lol'
        })
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}
const express = require('express')
const authRouter = express.Router();
const userModel = require('../models/userModel')

authRouter
.route('/signup')
.get(middleware1, getSignUp, middleware2)
.post(postSignUp)

authRouter
.route('/login')
.post(postLogin)

function middleware1(req, res, next){
    // console.log('[+] middleware1 encountered');
    next();
}
function middleware2(req, res, next){
    // console.log('[+] middleware2 encountered');
    res.sendFile(__dirname+'/../public/index.html')
}

function getSignUp(req, res, next){
    // console.log('[+] getting signup page')
    // res.sendFile(__dirname+'/public/index.html')
    next()
}

async function postSignUp(req, res){
    // let email = req.body.email
    // let username = req.body.username
    // let password = req.body.password
    // let confirmPassword = req.body.confirmPassword

    let data = await userModel.create(req.body)

    // console.log('[+] from postSignUp', req.body)
    res.send({
        "msg":"user signed up",
        "user":data
    })
}

function postLogin(req, res){
    
}

module.exports = authRouter


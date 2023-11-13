const express = require('express')
const userRouter = express.Router();
const userRouterFunctions = require('../user router functions')
const userModel = require('../models/userModel')

// routes of miniapp - userRouter
userRouter
.route('/')     // this means the route is '/user/'
.get(getUser)
.post(userRouterFunctions.postUser)
.patch(updateUser)
.delete(userRouterFunctions.deleteUser)

// cookies
userRouter
.route('/setCookies')
.get(setCookies)

userRouter
.route('/getCookies')
.get(getCookies)

userRouter
.route('/:id')  // this means the route is '/user/:id'
.get(userRouterFunctions.getUserById)



async function getUser(req, res){
    let users = await userModel.find()
    res.json({
        "msg":"all users fetched",
        "users":users
    });
}

function setCookies(req, res){
    // res.setHeader('Set-Cookie', 'isLoggedIn=true')

    res.cookie('isLoggedIn', true, {maxAge:24*60*60*1000, secure:true, httpOnly:true});
    res.cookie('2ndcookie', true);
    res.cookie('temp', true, {maxAge:10*1000, secure:true, httpOnly:true});
    console.log('[+] cookies has been set')
    res.send('cookies has been set')
}

function getCookies(req, res){
    let cookies = req.cookies
    console.log(cookies)
    res.json({
        "msg":"cookies received",
        "cookies":cookies
    })
}

async function updateUser(req, res){
    let user = await userModel.findOneAndUpdate({'email':'mario@cartoon.com'}, {'name':'mario cartoon'});
    res.json({
        "res":'data updated successfully',
        "users":user
    })
}




module.exports = userRouter
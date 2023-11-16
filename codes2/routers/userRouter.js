const express = require('express')
const userRouter = express.Router();
const userRouterFunctions = require('../user router functions')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const log = require('../logger')
const keys = require('../sescrets')

// routes of miniapp - userRouter
userRouter
.route('/')     // this means the route is '/user/'
.get(log, getUser)
.post(log, userRouterFunctions.postUser)
.patch(log, updateUser)
.delete(log, userRouterFunctions.deleteUser)

// cookies
userRouter
.route('/setCookies')
.get(log, setCookies)

userRouter
.route('/getCookies')
.get(log, getCookies)


userRouter
.route('/protected_route')
.get(log, protect_middleware, protected_route)

// this route should always present after all routes
userRouter
.route('/:id')  // this means the route is '/user/:id'
.get(log, userRouterFunctions.getUserById)


async function getUser(req, res){
    let users = await userModel.find()
    res.json({
        "msg":"all users fetched",
        "users":users
    });
}

function setCookies(req, res){
    // res.setHeader('Set-Cookie', 'isLoggedIn=true')

    res.cookie('1st cookie', true);
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

function protect_middleware(req, res, next){
    try {
        if(!req.cookies.login){
            return res.redirect('/auth/login');
        }
        else{
            let isVerified = jwt.verify(req.cookies.login, keys.JWT_KEY);
            if(isVerified){
                next();
            }
            else{
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

function protected_route(req, res, next){
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

module.exports = userRouter
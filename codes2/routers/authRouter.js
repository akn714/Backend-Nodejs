const express = require('express')
const authRouter = express.Router();
const userModel = require('../models/userModel')

authRouter
.route('/signup')
.get(middleware1, getSignUp, middleware2)
.post(postSignUp)

authRouter
.route('/login')
.get(getLoginPage)
.post(loginUser)

function middleware1(req, res, next){
    // console.log('[+] middleware1 encountered');
    next();
}
function middleware2(req, res, next){
    // console.log('[+] middleware2 encountered');
    return res.sendFile('C:/Users/adars/Desktop/coding/github/Backend-Nodejs/codes2/public/index.html')
    // return res.json({
    //     message: 'GET /signup'
    // })
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

    let data;
    try {
        data = await userModel.create(req.body);
    }
    catch (error) {        
        if(req.body.password.length<8){
            // res.redirect('/')
            return res.send({
                message: 'password should contain atleast 8 characters'
            })
        }
        return res.send({
            message: 'an error occured!'
        })
    }

    // console.log('[+] from postSignUp', req.body)
    res.send({
        "msg":"user signed up",
        "user":data
    })
}

function getLoginPage(req, res){
    return res.sendFile('C:/Users/adars/Desktop/coding/github/Backend-Nodejs/codes2/public/login.html')
}

async function loginUser(req, res){
    try {
        let data = req.body;
        let user = await userModel.findOne({'email':data.email});
    
        if(user){
            // bcrpyt -> compare
            if(user.password==data.password){
                return res.json({
                    message: 'User has logged in',
                    userDetails: data
                });
            }
            else{
                return res.json({
                    message: 'Invalid credentials!'
                })
            }
        }
        else{
            return res.json({
                message: 'user not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = authRouter


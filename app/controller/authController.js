const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const keys = require('../sescrets')

module.exports.middleware1 = function middleware1(req, res, next){
    // console.log('[+] middleware1 encountered');
    next();
}

module.exports.middleware2 = function middleware2(req, res, next){
    // console.log('[+] middleware2 encountered');
    return res.sendFile('C:/Users/adars/Desktop/coding/github/Backend-Nodejs/codes2/public/index.html')
    // return res.json({
    //     message: 'GET /signup'
    // })
}

module.exports.getSignUp = function getSignUp(req, res, next){
    // console.log('[+] getting signup page')
    // res.sendFile(__dirname+'/public/index.html')
    next()
}

module.exports.postSignUp = async function postSignUp(req, res){
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

module.exports.getLoginPage = function getLoginPage(req, res){
    return res.sendFile('C:/Users/adars/Desktop/coding/github/Backend-Nodejs/codes2/public/login.html')
}

module.exports.loginUser = async function loginUser(req, res){
    try {
        let data = req.body;
        let user = await userModel.findOne({'email':data.email});
    
        if(user){
            // bcrpyt -> compare
            if(user.password==data.password){
                // setting isLoggedIn cookie true if the user is logged in
                // res.cookie('isLoggedIn', true, {maxAge:24*60*60*1000, secure:true, httpOnly:true});
                let uid = user['_id'];
                let token = jwt.sign({payload: uid}, keys.JWT_KEY);
                res.cookie('login', token, {maxAge:24*60*60*1000, secure:true, httpOnly:true});
                
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

module.exports.logoutUser = function logoutUser(req, res){
    res.cookie('login', '', {expires: new Date(0), httpOnly: true, secure: true})
    res.send({
        message: 'User logged out'
    })
}

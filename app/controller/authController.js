const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../sescrets')

// get signup page
module.exports.getSignupPage = function getSignupPage(req, res){
    if(req.cookies.login){
        return res.send({
            message: 'User Already Logged In'
        })
    }
    res.sendFile('D:/coding/github/Backend-Nodejs/app/public/signup.html')
}

// signup user
module.exports.signup = async function signup(req, res) {
    try {
        if(req.cookies.login){
            return res.send({
                message: 'User Already Logged In'
            })
        }
        let data = req.body;
        console.log(data)
        let user = await userModel.create(data);
        console.log(user)

        if (user) {
            let uid = user['_id'];
            let token = jwt.sign({ payload: uid }, JWT_KEY);
            res.cookie('login', token, { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true });

            return res.json({
                message: 'user signed up',
                data: user
            })
        }
        else {
            return res.json({
                message: 'An error occured while signing up'
            })
        }


        // if(req.body.password.length<8){
        //     // res.redirect('/')
        //     return res.send({
        //         message: 'password should contain atleast 8 characters'
        //     })
        // }
    }
    catch (error) {
        return res.json({
            error: error
        })
    }
}

// get login page
module.exports.getLoginPage = function getLoginPage(req, res){
    if(req.cookies.login){
        return res.send({
            message: 'User Already Logged In'
        })
    }
    res.sendFile('D:/coding/github/Backend-Nodejs/app/public/login.html')
}

// login user
module.exports.login = async function login(req, res) {
    try {
        if(req.cookies.login){
            return res.send({
                message: 'User Already Logged In'
            })
        }
        let data = req.body;

        if (!data.email) {
            console.log('asdfasf')
            return res.json({
                message: 'User not found'
            })
        }

        let user = await userModel.findOne({ 'email': data.email });

        if (user) {
            // bcrpyt -> compare
            if (user.password == data.password) {
                // setting isLoggedIn cookie true if the user is logged in
                // res.cookie('isLoggedIn', true, {maxAge:24*60*60*1000, secure:true, httpOnly:true});
                let uid = user['_id'];
                let token = jwt.sign({ payload: uid }, JWT_KEY);
                res.cookie('login', token, { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true });

                return res.json({
                    message: 'User has logged in',
                    userDetails: data
                });
            }
            else {
                return res.json({
                    message: 'Invalid credentials!'
                })
            }
        }
        else {
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

// isAuthorised function -> To check user's role
module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        }
        else {
            return res.status(401).json({
                message: 'Operation Not Allowed'
            })
        }
    }
}

// protectRoute
module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        if (!req.cookies.login) {
            return res.redirect('/user/login');
            // return res.json({
            //     message: 'I am redirected to this route'
            // })
        }
        else {
            let token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            if(payload){
                try {
                    const user = await userModel.findById(payload.payload);
                    req.role = user.role;
                    req.id = user.id;
                    next();
                } catch (error) {
                    return res.json({
                        message: 'User Not Found'
                    })
                }
            }
            else{
                return res.json({
                    message: 'User Not Found'
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}

// logout funcion
module.exports.logoutUser = function logoutUser(req, res) {
    res.cookie('login', '', { expires: new Date(0), httpOnly: true, secure: true })
    res.send({
        message: 'User logged out'
    })
}

// forget password
module.exports.forgetpassword = async function forgetpassword(req, res){
    let {email} = req.body;
    try {
        const user = await userModel.findOne({email:email});
        if(user){
            // createResetToken creates a new token
            const resetToken = user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`
    
            // send mail to the user -> nodemailer
        }
        else{
            return res.json({
                message: 'Please signup'
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

// reset password
module.exports.resetpassword = async function resetpassword(req, res){
    try {
        const token = req.params.token;
        let {password, confirmPassword} = req.body;
        const user = await userModel.findOne({resetToken: token});
        if(user){
            // resetPasswordHandler will update user in db
            user.resetPasswordHandler(password, confirmPassword);
            await user.save();
            res.json({
                message: 'password changed succesfully'
            })
        }
        else{
            return res.json({
                message: 'user not found'
            })
        }
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

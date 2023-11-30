const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { JWT_KEY } = require('../sescrets')
const { sendMail } = require('../utility/nodemailer')

// get signup page
module.exports.getSignupPage = function getSignupPage(req, res){
    if(req.cookies.login){
        return res.send({
            message: 'User Already Logged In'
        })
    }
    res.sendFile('D:/coding/github/Backend-Nodejs/app/views/signup.html')
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
            console.log(uid, token)
            res.cookie('login', token, { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true });

            sendMail("signup", user)

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
            error: error.message
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
    res.sendFile('D:/coding/github/Backend-Nodejs/app/views/login.html')
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
            user.temp.push(Math.random(1,100)*100)

            // bcrpyt -> compare
            let isValid = await bcrypt.compare(data.password, user.password);
            if (user.role=='admin'?(data.password==user.password):isValid) {
                data.password = user.password;
                // setting isLoggedIn cookie true if the user is logged in
                // res.cookie('isLoggedIn', true, {maxAge:24*60*60*1000, secure:true, httpOnly:true});
                let uid = user['_id'];
                let token = jwt.sign({ payload: uid }, JWT_KEY);
                console.log(uid, token)
                res.cookie('login', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

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
            // checking if the request is made from any browser or and app like postman
            const client = req.get('User-Agent');
            if(client.includes('Mozilla')==true){
                return res.redirect('/user/login');
            }
            else{
                return res.json({
                    message: 'please login'
                })
            }
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
                res.cookie('login', '', { expires: new Date(0), httpOnly: true })
                return res.json({
                    message: 'User Not Found'
                })
            }
        }
    } catch (error) {
        res.cookie('login', '', { expires: new Date(0), httpOnly: true })
        res.status(500).send({
            error: error
        })
    }
}

// logout funcion
module.exports.logout = function logout(req, res) {
    res.cookie('login', '', { expires: new Date(0), httpOnly: true })
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
            const resetToken = await user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`

            let obj = {
                resetPasswordLink: resetPasswordLink,
                email: email
            }
    
            // send mail to the user -> nodemailer
            sendMail("resetpassword", obj)
            res.json({
                message: 'reset password link send to your registered email address'
            })
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

module.exports.getResetPasswordPage = function getResetPasswordPage(req, res){
    let token = req.params.token;
    res.send(`
        <h1>Reset Password</h1>
        <form action="/user/resetpassword/${token}" method="post">
            <label for="password">enter new password</label>
            <input type="password" id="password" name="password">
            <label for="password">confirm new password</label>
            <input type="password" id="password" name="confirmPassword">
            <button>Reset Password</button>
        </form>
    `)
}

// reset password
module.exports.resetpassword = async function resetpassword(req, res){
    try {
        const token = req.params.token;
        let {password, confirmPassword} = req.body;
        const _user = await userModel.find({email: 'akumark2004@gmail.com'})
        console.log(_user)
        const user = await userModel.findOne({resetToken: token});
        console.log(user)
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

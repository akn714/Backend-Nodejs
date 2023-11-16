const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const keys = require('../sescrets')

module.exports.getUser = async function getUser(req, res) {
    let id = req.params.id;

    let user = await userModel.findById(id);
    if (user) {
        return res.json({
            user: user
        })
    }
    else {
        return res.json({
            msg: 'user not found'
        })
    }
}

module.exports.updateUser = async function updateUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }

            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            return res.json({
                "res": 'data updated successfully',
                "users": user
            })
        }
        else {
            return res.json({
                message: 'User not found'
            })
        }
    } catch (error) {
        res.json({
            error: error
        })
    }
}

module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
    
        if(user){
            res.json({
                "res": 'data delete successfully',
                "users": users
            })
        }
        else{
            res.json({
                message: 'User Deleted Successfully',
                data: user
            })
        }
    } catch (error) {
        res.json({
            error: error
        })
    }
}

module.exports.getAllUser = async function getAllUser(req, res) {
    try {
        let users = await userModel.find();
        if(users){
            res.json({
                message: 'Users Retrieved',
                data: users
            })
        }
        else{
            res.json({
                message: 'No User Retrieved'
            })
        }
    } catch (error) {
        res.json({
            error: error
        })   
    }
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
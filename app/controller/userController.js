const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../sescrets')

module.exports.getUser = async function getUser(req, res) {
    let id = req.id;

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
        // let id = req.params.id;
        let id = req.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        // console.log(dataToBeUpdated)
        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                console.log('key:', key)
                if(key=='password'){
                    continue
                }
                keys.push(key);
            }

            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = null;
            console.log(user, dataToBeUpdated)
            
            await user.save();

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
        // let id = req.params.id;
        let id = req.id;
        let user = await userModel.findByIdAndDelete(id);
    
        if(user){
            res.cookie('login', '', { expires: new Date(0), httpOnly: true, secure: true })
            
            res.json({
                message: 'user delete successfully',
                deletedUser: user
            })
        }
        else{
            res.json({
                message: 'User not found'
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

module.exports.uploadProfileImage = function uploadProfileImage(req, res){
    res.json({
        message: 'file uploaded succesfully'
    })
}


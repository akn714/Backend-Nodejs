const express = require('express')
const log = require('../logger')
const {getUser, getAllUser, deleteUser, updateUser } = require('../controller/userController')
const { getSignupPage, getLoginPage, signup, login, isAuthorised, protectRoute, logout } = require('../controller/authController')
const userModel = require('../models/userModel')
const userRouter = express.Router()

// user options
// userRouter.route('/:id')
// .patch(updateUser)
// .delete(deleteUser)

userRouter.route('/signup')
.get(getSignupPage)
.post(signup)

userRouter.route('/login')
.get(getLoginPage)
.post(login)

// userRouter.route('/forgetpassword')
// .post(forgetpassword)

// userRouter.route('/resetpassword/:token')
// .post(resetpassword)

// profile page
userRouter.use(protectRoute)
userRouter.route('/userProfile')
.get(getUser)

userRouter.route('/logout')
.get(logout)

userRouter.route('/update')
.patch(updateUser)
// .get((req, res)=>{
//     res.sendFile('D:/coding/github/Backend-Nodejs/app/public/updateUser.html')
// })

userRouter.route('/delete')
.delete(deleteUser)
// .get((req, res)=>{
//     res.sendFile('D:/coding/github/Backend-Nodejs/app/public/deleteUser.html')
// })

// ADMIN SPECIFIC ROUTES
userRouter.use(isAuthorised(['admin']))

// this route deletes a perticular user
userRouter.route('/:id')
.get(async (req, res)=>{
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        res.send({
            message: 'user deleted successfully',
            user: user
        })
    } catch (error) {
        res.send({
            error: error
        })
    }
})

// this route deletes all users except admin
userRouter.route('/deleteAll')
.get(async (req, res)=>{
    try {
        let users = await userModel.find();
        let deletedUsers = [];
        users.forEach(async element => {
            if(element.role!='admin'){
                let user = await userModel.findByIdAndDelete(element['_id'])
                deletedUsers.push(user);
            }
        });

        res.send({
            message: 'deleted all users',
            deletedUsers: deletedUsers
        })
    } catch (error) {
        res.send({
            error: error
        })
    }
})

userRouter.route('')
.get(getAllUser)

module.exports = userRouter
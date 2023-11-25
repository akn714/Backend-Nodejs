const express = require('express')
const multer = require('multer')

const log = require('../logger')
const {getUser, getAllUser, deleteUser, updateUser, uploadProfileImage } = require('../controller/userController')
const { getSignupPage, getLoginPage, signup, login, isAuthorised, protectRoute, logout, forgetpassword, getResetPasswordPage, resetpassword } = require('../controller/authController')
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

userRouter.route('/forgetpassword')
.post(forgetpassword)

userRouter.route('/resetpassword/:token')
.get(getResetPasswordPage)
.post(resetpassword)

// multer for file upload
const multerStorage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/images');
    },
    filename: function(req, file, callback){
        callback(null, `user-${Date.now()}.jpeg`)
    }
})

const filter = function(req, file, callback){
    if(file.mimetype.startsWith("image")){
        callback(null, true);
    }
    else{
        callback(new Error("Not an Image! Please upload an image"), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
})

// profile page
userRouter.use(protectRoute)
userRouter.route('/userProfile')
.get(getUser)

userRouter.post('/profileImage', upload.single("photo"), uploadProfileImage)
userRouter.get('/profileImage', (req, res)=>{
    res.sendFile("D:/coding/github/Backend-Nodejs/app/views/multer.html")
})

userRouter.route('/logout')
.get(logout)

userRouter.route('/update')
.patch(updateUser)
// .get((req, res)=>{
//     res.sendFile('D:/coding/github/Backend-Nodejs/app/views/updateUser.html')
// })

userRouter.route('/delete')
.delete(deleteUser)
// .get((req, res)=>{
//     res.sendFile('D:/coding/github/Backend-Nodejs/app/views/deleteUser.html')
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
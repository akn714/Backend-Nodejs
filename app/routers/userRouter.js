const express = require('express')
const log = require('../logger')
const {getUser, getAllUser } = require('../controller/userController')
const { getSignupPage, getLoginPage, signup, login, isAuthorised, protectRoute, logoutUser } = require('../controller/authController')
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

// profile page
userRouter.use(protectRoute)
userRouter.route('/userProfile')
.get(getUser)

userRouter.route('/logout')
.get(logoutUser)

// admin specific routes
userRouter.use(isAuthorised(['admin']))
userRouter.route('')
.get(getAllUser)

module.exports = userRouter
const express = require('express')
const log = require('../logger')
const {getUser, getAllUsers, updateUser, deleteUser, protect_middleware, protected_route} = require('../controller/userController')
const app = require('../app')
const userRouter = express.Router()


// user options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

// profile page
app.use(protect_middleware)
userRouter.route('/userProfile')
.get(getUser)

// admin specific routes
app.use(isAuthorised(['admin']))
userRouter.route('')
.get(getAllUsers)

module.exports = userRouter
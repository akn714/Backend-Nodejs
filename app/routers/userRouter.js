const express = require('express')
const log = require('../logger')
const {getUsers, postUser, updateUser, deleteUser, getUserById, protect_middleware, protected_route} = require('../controller/userController')

const userRouter = express.Router()


// routes of miniapp - userRouter
userRouter
.route('/')     // this means the route is '/user/'
.get(log, getUsers)
.post(log, postUser)
.patch(log, updateUser)
.delete(log, deleteUser)

userRouter
.route('/protected_route')
.get(log, protect_middleware, protected_route)

// this route should always present after all routes
userRouter
.route('/:id')  // this means the route is '/user/:id'
.get(log, getUserById)

module.exports = userRouter
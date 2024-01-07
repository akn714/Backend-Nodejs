const express = require('express')
const { protectRoute, isAuthorised } = require('../controller/authController')
const { createSession } = require('../controller/bookingController')
const bookingRouter = express.Router()

bookingRouter.use(protectRoute)
bookingRouter.get('/createSession', (req, res)=>{
    res.sendFile('D:/coding/github/Backend-Nodejs/app/views/booking.html')
})
bookingRouter.post('/createSession', createSession)


module.exports = bookingRouter

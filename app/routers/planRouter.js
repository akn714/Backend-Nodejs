const express = require('express')
const { protectRoute, isAuthorised } = require('../controller/authController')
const planRouter = express.Router()
const {getPlan, getAllPlans, createPlan, updatePlan, deletePlan} = require('../controller/planController')

planRouter.route('/allPlans')
.get(getAllPlans)

// top 3 plans

planRouter.use(protectRoute)
planRouter.route('/plan/:id')
.get(getPlan)

planRouter.use(isAuthorised(['admin','resturantowner']))
planRouter.route()
.post(createPlan)
.patch(updatePlan)
.delete(deletePlan)
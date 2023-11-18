const express = require('express')
const { protectRoute, isAuthorised } = require('../controller/authController')
const planRouter = express.Router()
const {getPlan, getAllPlans, createPlan, updatePlan, deletePlan, top3Plans} = require('../controller/planController')

planRouter.route('/allPlans')
.get(getAllPlans)

// top 3 plans
planRouter.route('/top3plans')
.get(top3Plans)

planRouter.use(protectRoute)
planRouter.route('/:id')
.get(getPlan)

planRouter.use(isAuthorised(['admin','resturantowner']))
planRouter.route('/crudPlan')
.post(createPlan)

planRouter.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)

module.exports = planRouter

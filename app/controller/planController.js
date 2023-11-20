const planModel = require('../models/planModel')

module.exports.getAllPlans = async function getAllPlans(req, res){
    try {
        let plan = await planModel.find();
        if(plan){
            return res.json({
                message: 'plans retrieved',
                data: plan
            })
        }
        else{
            return res.json({
                message: 'no plans found'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports.getPlan = async function getPlan(req, res){
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if(plan){
            return res.json({
                message: 'plan retrieved',
                data: plan
            })
        }
        else{
            return res.json({
                message: 'plan not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports.createPlan = async function createPlan(req, res){
    try {
        let planData = req.body;
        let createdPlan = await planModel.create(planData);
        return res.json({
            message: 'plan created succesfully',
            plan: createdPlan
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res){
    try {
        let id = req.params.id
        let deletedPlan = await planModel.findByIdAndDelete(id);
        return res.json({
            message: 'plan deleted succesfully',
            deletedPlan: deletedPlan
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports.updatePlan = async function updatePlan(req, res){
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        if(plan){
            for(let i=0;i<keys.length;i++){
                plan[keys[i]] = dataToBeUpdated[keys[i]];
            }
            console.log('plan', plan)
            console.log('datatobeudated', dataToBeUpdated)
            await plan.save();
            return res.json({
                message: 'plan updated succesfully',
                plan: plan
            })
        }
        else{
            return res.json({
                message: 'plan not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

module.exports.top3Plans = async function top3Plans(req, res){
    try {
        const plans = await planModel.find().sort({
            ratingsAverage: -1
        }).limit(3);

        return res.json({
            message: 'top 3 plans',
            data: plans
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


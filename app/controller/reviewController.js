const reviewModel = require('../models/reviewModel')
const planModel = require('../models/planModel')

module.exports.getAllReviews = async function getAllReviews(req, res){
    try {
        let reviews = await reviewModel.find();
        if(reviews){
            return res.json({
                message: 'fetched all reviews',
                data: reviews
            })
        }
        else{
            return res.json({
                message: 'no reviews found'
            })
        }
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

module.exports.top3Reviews = async function top3Reviews(req, res){
    try {
        const review = await reviewModel.find().sort({
            rating: -1
        }).limit(3);
        if(review){
            return res.json({
                message: 'top 3 reviews',
                data: review
            })
        }
        else{
            return res.json({
                message: 'no reviews found'
            })
        }
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

module.exports.getPlanReview = async function getPlanReview(req, res){
    try {
        let id = req.params.id;
        let review = await reviewModel.findById(id);
        if(review){
            return res.json({
                message: 'review fetched',
                data: review
            })
        }
        else{
            return res.json({
                message: 'no review found'
            })
        }
    } catch (error) {
        return res.json({
            error: error
        })
    }
}


module.exports.createReview = async function createReview(req, res){
    try {
        let reviewData = req.body;
        let plan_id = req.params.plan;
        let createdReview = await reviewModel.create(reviewData);
        let plan = await planModel.findById(plan_id);
        
        // calculating average rating of a perticular plan
        let noOfReviews = plan.noOfReviews;
        let totalRating = noOfReviews*plan.ratingsAverage;
        let ratingsAverage = (totalRating+reviewData.rating)/(noOfReviews+1);
        plan.ratingsAverage = ratingsAverage;
        plan.noOfReviews += 1;
        plan.save();

        return res.json({
            message: 'review created succesfully',
            data: createdReview
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports.deleteReview = async function deleteReview(req, res){
    try {
        let id = req.params.id
        let deletedReview = await reviewModel.findByIdAndDelete(id);
        return res.json({
            message: 'review deleted succesfully',
            deletedPlan: deletedReview
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports.updateReview = async function updateReview(req, res){
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let review = await reviewModel.findById(id);
        if(review){
            for(let i=0;i<keys.length;i++){
                review[keys[i]] = dataToBeUpdated[keys[i]];
            }
            await review.save();
            return res.json({
                message: 'review updated succesfully',
                data: review
            })
        }
        else{
            return res.json({
                message: 'review not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}




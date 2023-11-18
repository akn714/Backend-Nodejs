const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

// connecting to db
const db_link = process.env.DB_LINK;
mongoose.connect(db_link)
.then((db)=>{
    // console.log(db)
    console.log('[+] plan db connected')
})
.catch((err)=>{
    console.log(err)
})


// schema
const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:[true, 'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true, 'rating is required']
    },
    createdAt:{
        type:Number,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true, 'review must belong to a user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true, 'review must belong to a plan']
    }
})

// pre hook
reviewSchema.pre(/^find/, function(nenxt){
    this.populate({
        path: "user",
        select: "name profileImage"
    }).populate("plan");
    next();
})

// model
const reviewModel = mongoose.model('reviewModel', reviewSchema);


module.exports = reviewModel
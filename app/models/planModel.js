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
const planSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20, 'plan name should not exceed more than 20 characters']
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true, 'price not entered']
    },
    ratingsAverage:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100
        }, 'discount should not exceed price']
    }
})


// model
const planModel = mongoose.model('planModel', planSchema);

(async function createPlan(){
    let planObj = {
        name: 'SuperFood',
        duration: 30,
        price: 1000,
        ratingsAverage:5,
        discount:20
    }
    let data = await planModel.create(planObj);
    // const doc = new planModel(planObj);
    // await doc.save();
    console.log(doc)
})();

module.exports = planModel
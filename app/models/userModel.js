const mongoose = require('mongoose')
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')

const dotenv = require('dotenv')
dotenv.config()

// connecting to db
const db_link = process.env.DB_LINK;
mongoose.connect(db_link)
.then((db)=>{
    // console.log(db)
    console.log('[+] db connected')
})
.catch((err)=>{
    console.log(err)
})

// schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email)
        }
    },
    password:{
        type:String,
        require:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        require:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password
        }
    }
})

// hooks
userSchema.pre('save', function(){
    console.log('[+] befor saving in database', this)
    this.confirmPassword = undefined;   // by doing this mongoDB will not save confirmPassword
})

userSchema.post('save', function(doc){
    console.log('[+] after saving in database', doc)
})

// hashing
// userSchema.pre('save', async function(){
//     const salt = await bcrypt.genSalt()
//     console.log('[+] salt:', salt)
//     const hashedPassword = await bcrypt.hash(this.password, salt)
//     console.log(`[+] ${hashedPassword} is hashed password for ${this.password}`)

//     // saving hashed password
//     this.password = hashedPassword
// })

// model
const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel
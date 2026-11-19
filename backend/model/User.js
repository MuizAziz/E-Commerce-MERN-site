const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    // Authentication Purpose ky liye bnaya hy 
    // Role by default user hoga jo sirf shopping kr skta hy and ADMIN changes kr skta hy
    role : {
        type : String,
        required : true,
        default : 'user'
    },
    // Email verify hogi to true hojye ga . Ye OTP ky time use ma aye ga
    verified : {
        type : Boolean,
        default : false
    }
})


// In this 'User' is the name of the model and 'userSchema' is the schema in which data is defined.
module.exports =   mongoose.model('User' , userSchema)


// We could've also written like this . But we use oneliner (short way) 
// const userModel = mongoose.model('User' , userSchema)
// module.exports userModel
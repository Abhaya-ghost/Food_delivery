const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, 'Please provide your name'],
    },
    email : {
        type : String,
        required : [true, 'Please provide your email'],
        unique : true,
    },
    password : {
        type : String,
        required : [true, 'Please provide a password'],
        minlength : 6,
        select : false
    },
    confirmPassword : {
        type : String,
        required : [true, 'Please confirm your password'],
        minlength : 6,
        select : false,
        validate : {
            validator : function (el) {
                return el === this.password
            },
            message : "Passwords doesn't match"
        }
    },
    passwordChangedAt : Date,
    isVerified : {
        type : Boolean,
        default : false,
        select : true,
    },
    otp : {
        type : Number,
    },
    street : {
        type : String,
        required :false,
    },
    city : {
        type : String,
        required :false,
    },
    state : {
        type : String,
        required :false,
    },
    zipcode : {
        type : String,
        required :false,
    },
    country : {
        type : String,
        required :false,
    },
    role : {
        type : String,
        enum : ['user','admin'],
        default: 'user'
    },
    profileImg : {
        type : String,
        required : true
    },
},{timestamps : true})

module.exports = mongoose.model('User', UserSchema)
const mongoose = require("mongoose")
var validator = require('validator');

//defining Schema
const userSchema = mongoose.Schema({
    name:{
        type: String,
        minlength: 3,
        maxlength: 15,
        required: [true, 'Firstname is required.'],
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Email is required.'],
        validate: [validator.isEmail, 'Email is not valid.'],
    },
    phone:{
        type: Number,
        require: true,
        unique: true,
        maxlength: 10,
        minlength: 10,
        required: [true, 'Phone is required.'],
    }
})

//exporting schema
module.exports = mongoose.model("User", userSchema);


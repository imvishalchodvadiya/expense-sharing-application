//Creating group Schema
const mongoose = require("mongoose")
const User = require("./userModel");

//defining Schema
const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        required: [true, 'Name is required.'],
    },
    members:[
        {
            type:mongoose.Schema.ObjectId,
            ref: User
        }
    ]
    
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
//exporting schema
module.exports = mongoose.model("Group", groupSchema);
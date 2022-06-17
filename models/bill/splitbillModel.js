//Creating Expense Schema
const mongoose = require("mongoose");
const User = require("../user/userModel");
const Group = require("../user/groupModel");

//defining Schema
const splitbill = mongoose.Schema({
    gname:{
        type: mongoose.Schema.ObjectId,
        ref: Group
    },
    expenseType:{
        type: String,
        enum: ["EXACT", "PERCENT", "EQUAL"],
        default: "EQUAL"
    },
    paidBy:{
        type: mongoose.Schema.ObjectId,
        ref: User
    },
    amount: {
        type: Number,
        require: true
    },

    sharedBy:[
        {
            type:mongoose.Schema.ObjectId,
            ref: User
        }
    ],

    sharingStructure:{}
})


//exporting schema
module.exports = mongoose.model("splitbill", splitbill);
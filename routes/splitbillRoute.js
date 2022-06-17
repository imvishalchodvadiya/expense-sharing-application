const express = require("express");
const router = express.Router();

//require controllers
const {split} = require('../controllers/bill/splitbill.controller');

//defining routes
router.post('/', split)

//exporting router
module.exports=router;
const express = require("express");
const router = express.Router();

//require controllers
const {fetchGroup, creategroup} = require('../controllers/user/group.controller')

//defining routes
router.post('/creategroup/:userId',creategroup)
router.get("/",fetchGroup);

//exporting router
module.exports = router;
const express = require('express');
const {displayExpense} = require("../controllers/expense/displayexpense.controller")
const router = express.Router();

router.get("/:gid", displayExpense);
module.exports  = router;
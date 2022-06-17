const User = require("../../models/user/userModel");
const { STATUS_CODE, SUCCESS_MSG, STATUS } = require('../../constants/index');

//function to create new user and validation
const createuser = async (req,res,next)=>{
    data = await User.create(req.body);
    res.status(STATUS_CODE.CREATED).json({
        status: STATUS.SUCCESS,
        message: SUCCESS_MSG.SUCCESS_MESSAGES.CREATED,
        result: data,
    });      
}

//fetching all users
const fetchUser = (req, res) => {
    User.find({}, (err, user) => {
        res.status(STATUS_CODE.CREATED).json({
          status: STATUS.SUCCESS,
          message: SUCCESS_MSG.SUCCESS_MESSAGES.GET,
          result: user,
      }); 
    });
  };

  //exporting
module.exports = {fetchUser, createuser};

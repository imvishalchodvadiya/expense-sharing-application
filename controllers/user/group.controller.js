const { STATUS_CODE, SUCCESS_MSG, STATUS } = require('../../constants/index');
const Group = require("../../models/user/groupModel");
const User = require("../../models/user/userModel");
//function to create new group 

const creategroup = async (req,res)=>{
    let members = req.body.members;
    members.push((req.params.userId));
    const request = {
        "name": req.body.name,
        "members": members
    };
    data = await Group.create(request);

    res.status(STATUS_CODE.CREATED).json({
        status: STATUS.SUCCESS,
        message: SUCCESS_MSG.SUCCESS_MESSAGES.CREATED,
        result: data,
    });
    
}

const fetchGroup = (req, res) => {
    Group.find({}, (err, group) => {
        res.status(STATUS_CODE.CREATED).json({
          status: STATUS.SUCCESS,
          message: SUCCESS_MSG.SUCCESS_MESSAGES.GET,
          result: group,
      }); 
    });
  };

module.exports = {fetchGroup, creategroup};

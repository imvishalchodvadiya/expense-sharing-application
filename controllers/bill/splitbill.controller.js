const Splitbill = require("../../models/bill/splitbillModel");
const User = require("../../models/user/userModel");
const Group = require("../../models/user/groupModel");
const Expense = require("../../models/expense/expenseModel");

const {
    STATUS_CODE,
    SUCCESS_MSG,
    STATUS
} = require('../../constants/index');

const split = async (req, res) => {
    var expenses = [];
    var flag = 0;
    const newSplitBill = new Splitbill(req.body);
    const group = await Group.findById(req.body.gid);
    console.log(group);
    if (!group.members.includes(req.body.paidBy))
        return res.status(STATUS_CODE.BAD_REQUEST).send({
            message: "Invalid group!!"
        });


    if (req.body.sharedBy.length == 0)
        return res.status(STATUS_CODE.BAD_REQUEST).send({
            message: "No Members in group!!"
        });

    for (let i = 0; i < req.body.sharedBy.length; i++) {
        if (!group.members.includes(req.body.sharedBy[i]))
            return res.send({
                message: "Invalid members in group!!"
            });
    }

    newSplitBill
        .save()
        .catch((err) => {
            res.status(STATUS_CODE.BAD_REQUEST).json({
                status: STATUS.ERROR,
                message: `Failed to update data in database`
            });
        })

    if (req.body.expenseType == "PERCENT") {

        let sharingStructure = req.body.sharingStructure;
        let sharedBy = req.body.sharedBy;

        let sum = Object.values(sharingStructure).reduce((a, b) => {
            return a + b;
        });
        if (sum != 100) {
            flag = 1;
        } else {

            for (let i = 0; i < sharedBy.length; i++) {
                let amount = (((sharingStructure[sharedBy[i]]) / 100) * req.body.amount).toFixed(2);
                const expense = new Expense({
                    "groupId": req.body.gid,
                    "from": req.body.paidBy,
                    "to": sharedBy[i],
                    "amount": amount
                })

                expenses.push(expense);
                expense
                    .save()
                    .catch((err) => {
                        res.status(STATUS_CODE.BAD_REQUEST).json({
                            status: STATUS.ERROR,
                            message: `Error is ${err}`
                        });
                    })

            }
        }
    } else if (req.body.expenseType == "EQUAL") {

        let sharedBy = req.body.sharedBy;
        let amount = ((req.body.amount) / (sharedBy.length + 1)).toFixed(2);
        for (let i = 0; i < sharedBy.length; i++) {

            const expense = new Expense({
                "groupId": req.body.gid,
                "from": req.body.paidBy,
                "to": sharedBy[i],
                "amount": amount
            })
            expenses.push(expense);
            expense
                .save()
                .catch((err) => {
                    res.status(STATUS_CODE.BAD_REQUEST).json({
                        status: STATUS.ERROR,
                        message: `Error is ${err}`
                    });
                })

        }
    } else {
        let exactSharingStructure = req.body.sharingStructure;
        let sharedBy = req.body.sharedBy;

        for (let i = 0; i < Object.keys(exactSharingStructure).length; i++) {
            let amount = exactSharingStructure[sharedBy[i]];

            const expense = new Expense({
                "groupId": req.body.gid,
                "from": req.body.paidBy,
                "to": sharedBy[i],
                "amount": amount

            })
            expenses.push(expense);
            expense
                .save()
                .catch((err) => {
                    res.status(STATUS_CODE.BAD_REQUEST).json({
                        status: STATUS.ERROR,
                        message: `Error is ${err}`
                    });
                })
        }
    }

    if (flag != 1) {
        res.status(STATUS_CODE.OK).json({
            status: STATUS.SUCCESS,
            message: `Split Bill Info Updated Successfully`,
            expenses: expenses
        })
    } else {
        res.status(STATUS_CODE.BAD_REQUEST).json({
            status: STATUS.ERROR,
            message:'Sum of entered percentages is not 100. Please enter complete details'
        });
    }
}

module.exports = {
    split
};
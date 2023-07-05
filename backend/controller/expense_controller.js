const { ObjectId } = require("bson");
const Expense = require("../models/expense_model");
const userModel = require("../models/user_model");

exports.addExpense = async (req,res, next)=>{
    const {amount, description, category} = req.body;
    let expense;
    let currentUser;
    try {
        expense = new Expense({
            amount,
            description,
            category,
            user: req.user._id
        })
        await expense.save();
        currentUser = await userModel.findById(req.user._id);
        currentUser.expense.push(expense);
        await currentUser.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, error: err});
    }
    return res.status(200).json({expense, success:true});
}

exports.getAllExpense = async (req,res)=>{
    let user;
    console.log(req.user._id);
    try{
        user = await userModel.findOne(req.user).populate('expense');
    } catch (err){
        console.log(err);
        return res.status(500).json({success: false, error: err})
    }
    return res.status(201).json({user , success: true})
}

exports.deleteExpense = async (req,res)=>{
    const expenseid = req.params.expenseid;
    const id = new ObjectId(expenseid);
    let delexpense;
    let user;
    try {
        delexpense = await Expense.findByIdAndRemove(id);
        user = await userModel.findById(delexpense.user);
        user.expense.pull(delexpense);
        await user.save();
    } catch (err) {
        return res.status(400).json({success: false, error:err})
    }
    return res.status(200).json({success:true, delexpense})
}

exports.leaderboard = async (req, res)=>{
    let users;
    try {
        let detail = [];
        users = await userModel.find().populate('expense');
        users.forEach(each_user => {
            let amount = 0;
            each_user.expense.forEach(each_exp => {
                console.log(each_exp);
                amount += each_exp.amount;
            });
            console.log("----------");
            const doc = {
                "name": each_user.name,
                "amount": amount
            }
            detail.push(doc);
        });
        return res.status(201).json(detail);
    } catch (err) {
        return res.status(500).json({success: false, error: err})
    }
}
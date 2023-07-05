const Razorpay = require('razorpay');
const Order = require('../models/order_model');
const userModel = require('../models/user_model');
require('dotenv').config();

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID
const RAZORPAY_KEY_SECRET= process.env.RAZORPAY_KEY_SECRET

exports.premiumPurchase = async (req, res)=>{
    try {
        let instance = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        })
    
        const amount = 220;
        instance.orders.create({amount, currency:'INR'}, async (err, order)=>{
            if(err){
                console.log("Error>>>>>", err);
                return err;
            }
            let createOrder = new Order({
                user: req.user,
                order_id: order.id,
                status: 'Pending'              
            })
            console.log("Order>>>>>>", order);
            await createOrder.save();
            console.log(createOrder);
            return res.status(201).json({order, key_id: instance.key_id});
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err});
    }
}

exports.updateTransactionStatus = async (req, res)=>{
    try {
        const {payment_id, order_id} =  req.body;
        let order = await Order.findOneAndUpdate({order_id:order_id}, {
            payment_id: payment_id, 
            status:"Successful"
        })
        console.log("order>>>>", order);
        await userModel.findByIdAndUpdate(req.user._id, {isPremium: true});
        return res.status(202).json({success: true, message:"Transaction Successful"});

    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong',status:"UNSUCCESSFUL" })
    }
}

exports.getLatestUpdate = async (req,res)=>{
    let order;
    try {
        console.log("req.user>>>", req.user);
        order = await Order.findOne({user:req.user._id}).sort({_id:-1});
        console.log("Order>>", order);
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err});
    }
}
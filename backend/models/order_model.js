const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    payment_id:{
        type: String
    },
    order_id:{
        type:String
    },
    status:{
        type: String
    }
})

const order = mongoose.model('order', orderSchema);

module.exports = order;
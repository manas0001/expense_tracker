const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const expenseSchema = new Schema({
    amount:{
        type: Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    user:{type: mongoose.Schema.Types.ObjectId, required: true, ref:'userModel'}
});

const expense = mongoose.model('expense', expenseSchema);

module.exports = expense;
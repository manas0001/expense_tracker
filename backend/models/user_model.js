const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    isPremium:{
        type: Boolean,
        default: false
    },
    expense:[{type: mongoose.Schema.Types.ObjectId, required: true, ref:'expense'}],
    forgotpaasid:[]
})

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
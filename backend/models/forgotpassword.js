const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean
    }
})

const forgotPassword = mongoose.model('forgotPassword', schema);

module.exports = forgotPassword;
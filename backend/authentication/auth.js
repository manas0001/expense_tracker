const userModel = require("../models/user_model");
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next)=>{
    try {
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token, 'restfulapi');
        userModel.findById({_id:user._id}).then(user=>{
            req.user = user;
            console.log('Next----------------------');
            next();
        })
    } catch (err) {
        console.log(err);
        return res.status(401).json({status:false});
    }
}

module.exports = authenticate;
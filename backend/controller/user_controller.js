const userModel = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res)=>{
    const {name, email, password} = req.body;
    let existingUser;
    try {
        existingUser = await userModel.findOne({email});
    } catch (err) {
        return console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message: "User already exist! Login instead"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new userModel({
        name,
        email,
        password: hashedPassword
    })
    try {
        await user.save();
        console.log(user);
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({user});
}

exports.login = async (req,res)=>{
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await userModel.findOne({email});
        console.log(`Existing User${existingUser}`);
        if(!existingUser){
            console.log("user not found");
            return res.status(404).json({message: "User not found"});
        }
    } catch (err) {
        console.log(err);
        return console.log(err);
    }
    console.log("First",password);
    console.log("Second",existingUser.password);
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        console.log("incorrect password");
        return res.status(401).json({message: "Incorrect Password"});
    }

    console.log("LoginSuccessful");

    return res.status(200).json({token: jwt.sign({email:existingUser.email, _id: existingUser._id}, 'restfulapi')});
}
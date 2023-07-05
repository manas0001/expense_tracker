const Sib = require('sib-api-v3-sdk');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const forgotPassword = require('../models/forgotpassword');
const userModel = require('../models/user_model');
require('dotenv').config();

exports.forgotPassword = async (req,res)=>{
    const email = req.body.email;
    let user = await userModel.findOne({email:email});
    if(user){
        const uid = uuid.v4();

        var f_user = new forgotPassword({
            id: uid,
            isActive: true
        })
        await f_user.save();
        user.forgotpaasid.push(f_user);
        await user.save();
        console.log(user);
        const client = Sib.ApiClient.instance;
    
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY;
        const transEmailApi = new Sib.TransactionalEmailsApi()
    
        const sender = {
            email: 'manas.srivastava.444@gmail.com'
        }
        const receiver = [
            {
                email: email
            }
        ]
        transEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: 'Reset password link',
            textContent: `link is only for onetime use <a href="http://localhost:3000/resetpassword/${uid}">Reset password</a>`
        }).then((result) => {
            console.log(result);
            return res.status(201).json({
                message: "Link to reset your password have sent to your mail ",
                sucess: true,
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({success: false, error: err});
        });
    } else{
        console.log('User not found', email);
        res.status(404).json({message: 'User not found'});
    }
}

exports.resetpassword = async (req,res)=>{
    const id = req.params.id;
    const fpass = await forgotPassword.findOne({id:id});
    if(fpass){
        console.log(fpass.isActive);
        if(!fpass.isActive){
            return res.status(400).send(
                `<html>
                <h1>link has expired</h1>
                </html>`
            )
        }
        let fpid = await forgotPassword.updateOne({id:id},{
            isActive: false
        })
        console.log('updating as false-----------------');
        console.log(fpid);
        res.status(200).send(`<html>
        <script>
            function formsubmitted(e){
                e.preventDefault();
                console.log('called')
            }
        </script>
        <body>
        <form action="/updatepassword/${id}" method="get">
            <label for="newpassword">Enter New password</label>
            <input name="newpassword" type="password" required></input>
            <button>reset password</button>
        </form>
        </body>
        </html>`
        )
    }
}

exports.updatePassword = async (req,res)=>{
    const newpass = req.query.newpassword;
    const id = req.params.id;
    const hash = bcryptjs.hashSync(newpass);

    try {
        const user = await userModel.findOneAndUpdate({forgotpaasid: {$elemMatch: {id: id}} }, {
            password: hash
        })
        console.log("user>>>>",user);
        res.status(200).send(
        `<html>
            <h1> password changed sucessfully</h1>
        </html>`)
        
    } catch (err) {
        console.log(err);
        res.json({message: 'Something went wrong. Try again!!'})
    }
    
}





// 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
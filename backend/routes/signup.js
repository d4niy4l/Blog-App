const User = require('./../mongoDB/users');
const express = require('express');
const router = express.Router();
const encryption = require('./../controllers/encrypt');
router.route('/').post(async (req,res)=>{
    const {username,password,email} = req.body;
    try{
        const userExists = await User.find({username: username});
        const emailExists =  await User.find({email: email});
        if( userExists.length || emailExists.length ){
            let existMessage =  `${userExists.length ? 'USERNAME ALREADY EXISTS' : '' }
            ${emailExists.length ? 'EMAIL ALREADY EXISTS' : '' }`;
            existMessage = userExists.length && emailExists.length ? 'USERNAME AND EMAIL ALREADY EXIST'
            : existMessage;
            console.log(existMessage);
            return res.status(409).json({success: false,message: existMessage});
        }
        const encryptedPass = await encryption.encrypt(password);
        const user = new User({
            username: username,
            password: encryptedPass,
            email: email,
            dateJoined: new Date(),
            lastUpdated: new Date(), 
            bio: 'New to Bloggo 😊',
        })
        await user.save();
        res.status(200).json({success: true, message: 'success'});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: 'error making request'});
    }
})
module.exports = router;
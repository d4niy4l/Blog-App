const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../mongoDB/users');
const router = express.Router();
router.route('/').get((req,res)=>{
}).post(async (req,res)=>{
  const{username,password} = req.body;
  try{
    const user = await User.find({username: username});
    if(!user.length) return res.status(409).json({message: 'INCORRECT USERNAME OR PASSWORD'});
    const passwordMatch = await bcrypt.compare(password,user[0].password);
    if(!passwordMatch) return res.status(409).json({message: 'INCORRECT USERNAME OR PASSWORD'});
    res.status(200).json(user[0]);
  } 
  catch(err){
        console.log('ERROR: ',err);
  } 
})
module.exports = router;
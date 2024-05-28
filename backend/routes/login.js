const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../mongoDB/users');
const jwt = require('jsonwebtoken');
const router = express.Router();
const session_age = 100 * 24 * 60 * 60;
const create_token = (id) =>{
  return jwt.sign({id},"my-32-character-ultra-secure-and-ultra-long-secret",{
    expiresIn: session_age
  });
}
router.route('/').get((req,res)=>{
}).post(async (req,res)=>{
  const{username,password} = req.body; 
  try{
    const user = await User.find({username: username});
    if(!user.length) return res.status(409).json({message: 'INCORRECT USERNAME OR PASSWORD'});
    const passwordMatch = await bcrypt.compare(password,user[0].password);
    if(!passwordMatch) return res.status(409).json({message: 'INCORRECT USERNAME OR PASSWORD'});
    //console.log(user[0].id);
    const token = create_token(user[0].id);
    console.log(user[0].id);
    res.cookie("jwt",token,{
      withCredentials : true,
      httpOnly: false,
      maxAge: session_age,
      sameSite: "none",
      secure: process.env.NODE_ENV === 'production',
    });
    return res.status(200).json({username: user[0].username, id: user[0].id});
  } 
  catch(err){
        console.log('ERROR: ',err);
  } 
})
module.exports = router;
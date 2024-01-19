const User = require('./../mongoDB/users');
const jwt = require('jsonwebtoken');
module.exports.verify_user = async (req,res)=>{
    try{   
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(
                token,
                "my-32-character-ultra-secure-and-ultra-long-secret",
                async(err,decoded_token)=>{
                    if(err){
                        res.json({status:false});
                    }
                    else{
                        const user = await User.findById(decoded_token.id);
                        console.log(user);
                        if(user) res.json({status: true, username: user.username, id: user.id});
                        else res.json({status:false});
                    }
                }
            );
        }
        else{
            res.json({status:false});
        }
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

}
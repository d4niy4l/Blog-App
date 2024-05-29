const User = require('./../mongoDB/users');
const {jwtDecode} = require('jwt-decode');
module.exports.verify_user = async (req,res)=>{
    try{   
        const token = req.cookies.jwt;
        const id = jwtDecode(token).id;
        const user = await User.findById(id);
        if(user) return res.json({status: true, username: user.username, id: user.id});
        else{
            res.json({status:false});
        }
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

}
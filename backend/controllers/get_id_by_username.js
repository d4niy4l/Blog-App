const User = require('./../mongoDB/users');
get_id = async (req,res)=>{
    try{   
        const {username} = req.query;
        const user = await User.findOne({username: username});
        if(!user){
           return res.status(404).json({status:false});
        }
        res.status(200).json({status: true, username: user.username,id: user.id, date: user.dateJoined, bio: user.bio})
    }
    catch(err){
        console.log(err);
        res.json({status:false});
    }

}
module.exports = get_id;
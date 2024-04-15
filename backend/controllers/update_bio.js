const User = require('./../mongoDB/users');

const update_bio = async (req,res)=>{
    try{
        const {id, bio} = req.body;
        console.log('id:',id);
        const user = await User.findOne({_id: id});

        user.bio = bio;
        console.log(bio);
        await user.save();
        return res.status(200).json({status: true, bio: user.bio});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = update_bio;
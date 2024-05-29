const Image = require('./../mongoDB/profile_picture');
const User = require('./../mongoDB/users');
const fs = require('fs');
const path = require('path');
const {jwtDecode} = require('jwt-decode');

const remove_pfp = async (req,res)=>{
    try{
        const id = jwtDecode(req.cookies.jwt).id;
        const user = await User.findOne({_id: id});
        if(!user){
            return res.status(404).json({status: false});
        }

        const image = await Image.findOneAndDelete({user: id});
        if (!image) {
            return res.status(404).json({ status: false, message: 'Image not found' });
        }
        const filePath = path.join(path.join(__dirname, '..', image.filePath)); // Adjust the path to your uploads directory

        await fs.unlink(filePath);

        res.status(200).json({ status: true, url: `http://${req.headers.host}/public/pfp.jpg` });
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false});
    }

}

module.exports = remove_pfp;
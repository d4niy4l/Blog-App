const Image = require('./../mongoDB/profile_picture');
const User = require('./../mongoDB/users');
const {jwtDecode} = require('jwt-decode')

const get_profilepicture = async (req, res) => {
    try {
        if(req.cookies.jwt === undefined){
            const username = req.query.username;
            const user = await User.findOne({username: username});
            if (!user) {
                return res.status(404).send('User not found');
            }
            const pfp = await Image.findOne({user: user._id});
            if (pfp) {
                return res.status(200).json({url: pfp.imageUrl});

            } else {
                const image_url = `http://${req.headers.host}/public/pfp.jpg`;
                res.status(200).json({url: image_url});
            }
        }
        else{
            const userId = jwtDecode(req.cookies.jwt).id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).send('User not found');
            }
            const pfp = await Image.findOne({user: userId});
            if (pfp) {
                res.status(200).json({url: pfp.imageUrl});

            } else {
                const image_url = `http://${req.headers.host}/public/pfp.jpg`;
                res.status(200).json({url: image_url});
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = get_profilepicture;
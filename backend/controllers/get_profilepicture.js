const Image = require('./../mongoDB/profile_picture');
const User = require('./../mongoDB/users');
const path = require('path');


const defaultProfilePicturePath = '/public/pfp.jpg';
const get_profilepicture = async (req, res) => {
    try {
        const userId = req.query.user_id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.profilePicture) {
            const image = await Image.find({user: user._id});
            if (!image) {
                return res.status(404).send('Profile picture not found');
            }
            res.send(image.imageUrl);
        } else {
            const image_url = `http://${req.headers.host}/public/pfp.jpg`;
            res.status(200).json({url: image_url});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = get_profilepicture;
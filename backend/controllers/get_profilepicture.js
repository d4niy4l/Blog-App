const Image = require('./../mongoDB/profile_picture');
const User = require('./../mongoDB/users');
const path = require('path');


const defaultProfilePicturePath = path.join(__dirname, 'pfp.jpg');
const get_profilepicture = async (req, res) => {
    try {
        const userId = req.query.user_id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.profilePicture) {
            const image = await Image.findById(user.profilePicture);
            if (!image) {
                return res.status(404).send('Profile picture not found');
            }

            res.contentType(image.contentType);
            res.send(image.data);
        } else {
            res.sendFile(defaultProfilePicturePath);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = get_profilepicture;
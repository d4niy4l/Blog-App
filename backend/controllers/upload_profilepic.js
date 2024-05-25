const multer = require('multer');
const Image = require('./../mongoDB/profile_picture');
const User = require('./../mongoDB/users');
const { v4: UUIDV4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = UUIDV4().toString();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload_pfp = async (req, res) => {
  try {
    const file = req.file; 
    const user_id = req.body.user_id; 
    console.log(user_id);
    console.log(file);
    const user = await User.find({_id: user_id});
    if(!user){
      return res.status(404).json({message:'user not found'});
    }
    const image_url = `http://${req.headers.host}/${file.path}`;
    const image = new Image({
      fileName: file.filename,
      filePath: file.path,
      imageUrl: image_url,
      user: user_id
    });
    await image.save()
    return res.status(200).json({ imageUrl: imageUrl });
  }catch(err){
      console.log(err);
      return res.status(500).json({message: 'Internal Server Error'});
  }
};

const upload = multer({ storage: storage });

module.exports = {
  upload_pfp,
  upload
};

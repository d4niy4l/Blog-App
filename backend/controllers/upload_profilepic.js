const multer = require('multer');
const Image = require('./../mongoDB/profile_picture');
const User = require('./../mongoDB/users');
const FS = require('fs');
const path = require('path');
const {jwtDecode} = require('jwt-decode')
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
    const user_id = jwtDecode(req.cookies.jwt).id;
    const user = await User.find({_id: user_id});
    if(!user){
      return res.status(404).json({message:'user not found'});
    }
    const image_url = `http://${req.headers.host}/public/${file.filename}`;
    const pfp = await Image.findOne({user: user_id});
    if(pfp){
        FS.unlink(path.join(__dirname, '..', pfp.filePath), (err) => {
          if (err) console.error('Error deleting old file:', err);
          else console.log('Old file deleted:', pfp.filePath);
        });
        pfp.fileName = file.filename;
        pfp.filePath = file.path;
        pfp.imageUrl = image_url;
        await pfp.save();
     }
     else{
      const image = new Image({
        fileName: file.filename,
        filePath: file.path,
        imageUrl: image_url,
        user: user_id
      });
      await image.save()
    }
    return res.status(200).json({ imageUrl: image_url });
  }catch(err){
      console.log(err);
      FS.unlink(path.join(__dirname, '..', req.file.filePath), (err) => {
        if (err) console.error('Error deleting old file:', err);
        else console.log('Old file deleted:',req.file.filePath);
      });
      return res.status(500).json({message: 'Internal Server Error'});
  }
};

const upload = multer({ storage: storage });

module.exports = {
  upload_pfp,
  upload
};

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb (null, '/uploads');
  },
  filename: function (req,file,cb){
    const uniqueSuff = Date.now();
    cb(null, file, uniqueSuff + file.originalname);
  }
})

const upload_pfp = (req,res)=>{
  try{
      res.status(200).json({message: 'ok'});
  }catch(err){
    res.status(500).json({status:'Internal Server Error'})
  }
}

const upload = multer({storage: storage});

module.exports = {
  upload_pfp,
  upload
}

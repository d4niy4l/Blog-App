const express = require('express');
const router = express.Router();
const { upload_pfp, upload } = require('./../controllers/upload_profilepic');
const get_pfp = require('./../controllers/get_profilepicture');

router.route('/').get(get_pfp).post(upload.single("Image"),upload_pfp);

module.exports = router;
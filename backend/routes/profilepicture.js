const express = require('express');
const router = express.Router();

const get_pfp = require('./../controllers/get_profilepicture');

router.route('/').get(get_pfp);

module.exports = router;
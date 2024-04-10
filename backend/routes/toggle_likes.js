const express = require('express');
const router = express.Router();
const like_toggler = require('./../controllers/toggle_like');

router.route('/').get(like_toggler);

module.exports = router;
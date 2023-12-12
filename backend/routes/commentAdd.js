const express = require('express');
const router = express.Router();
const addComment = require('./../controllers/addComment');
router.route('/').post(addComment);
module.exports = router;
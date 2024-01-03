const express = require('express');
const router = express.Router();
const addComment = require('./../controllers/add_comment');
router.route('/').post(addComment);
module.exports = router;
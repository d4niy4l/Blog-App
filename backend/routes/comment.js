const express = require('express');
const router = express.Router();
const addComment = require('./../controllers/add_comment');
const getComments = require('./../controllers/get_all_comments');
router.route('/').post(addComment).get(getComments);
module.exports = router;
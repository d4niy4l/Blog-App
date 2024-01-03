const express = require('express');
const router = express.Router();
const blog = require('./../controllers/get_one_blog');
const deleteBlog = require('./../controllers/delete_blog');
router.route('/').get(blog).delete(deleteBlog);
module.exports = router;

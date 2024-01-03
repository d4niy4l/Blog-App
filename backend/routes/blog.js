const express = require('express');
const router = express.Router();
const submit = require('./../controllers/submit_blog');
const getBlogs = require('./../controllers/get_blog');
const deleteBlog = require('./../controllers/delete_all_blogs');
router.route('/')
.post(submit) 
.get(getBlogs)
.delete(deleteBlog);
module.exports = router;
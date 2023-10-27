const express = require('express');
const router = express.Router();
const submit = require('./../controllers/submit_blog');
const getBlogs = require('./../controllers/get_blog');
router.route('/')
.post(submit) 
.get(getBlogs);
module.exports = router;
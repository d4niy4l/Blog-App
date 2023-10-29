const express = require('express');
const router = express.Router();
const blog = require('./../controllers/get_one_blog');
router.route('/').get(blog);
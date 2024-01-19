const express = require('express');
const router = express.Router();
const get_all_blogs = require('./../controllers/get_all_blogs');
router.route('/')
.get(get_all_blogs)
module.exports = router;
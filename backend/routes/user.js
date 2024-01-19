const express = require('express');
const router = express.Router();
const get_username = require('./../controllers/get_id_by_username');
router.route('/').post(get_username)
module.exports = router;

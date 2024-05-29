const express = require('express');
const router = express.Router();
const remove_pfp = require('./../controllers/remove_pfp');

router.route('/').get(remove_pfp);

module.exports = router;
const update_bio = require('./../controllers/update_bio');
const router = require('express').Router();

router.route('/').post(update_bio);

module.exports = router;
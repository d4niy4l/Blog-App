const router = require('express').Router();
const {verify_user} = require('./../controllers/verify_user');
router.route('/').post(verify_user);
module.exports = router;
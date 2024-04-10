const search_profiles = require('../controllers/search_profiles');
const router = require('express').Router();
router.route('/').get(search_profiles);
module.exports = router;
const search_blogs = require('../controllers/search_blogs');
const router = require('express').Router();
router.route('/').get(search_blogs);
module.exports = router;
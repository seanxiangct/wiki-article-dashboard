var express = require('express');
var controller = require('../controllers/controller');
var router = express.Router();

router.get('/', controller.showLandingPage);
router.post('/signUp', controller.signUp);
router.post('/signIn', controller.signIn);
router.get('/analytics', controller.showAnalyticsPage);

module.exports = router;
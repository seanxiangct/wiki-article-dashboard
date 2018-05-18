var express = require('express');
var controller = require('../controllers/controller');
var router = express.Router();

// entry point
router.get('/', controller.showLandingPage);

// landing page routes
router.post('/signUp', controller.signUp);
router.post('/signIn', controller.signIn);

// analytics page routes
router.get('/analytics', controller.showAnalyticsPage);

module.exports = router;
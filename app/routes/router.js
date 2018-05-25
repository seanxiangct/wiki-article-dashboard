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
router.get('/numrevision', controller.numRevision);
//router.get('/popular', controller.numPopular);
router.get('/age', controller.numAge);

module.exports = router;
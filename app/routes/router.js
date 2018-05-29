var express = require('express');
var controller = require('../controllers/controller');
var router = express.Router();

// entry point
router.get('/', controller.showLandingPage);

// landing page routes
router.post('/signUp', controller.signUp);
router.post('/signIn', controller.signIn);

// analytics page routes
// group
router.get('/analytics', controller.showAnalyticsPage);
router.get('/numrevision', controller.numRevision);
router.get('/popular', controller.numPopular);
router.get('/age', controller.numAge);
// individual
router.get('/individual', controller.individualPage);
router.get('/individualresult', controller.individualResult);


// data acquisition routes
router.get('/userCounts', controller.getUserCounts);
router.get('/revisionByYear', controller.countByYearAndType);
router.get('/revisionByYearForArticle', controller.countByYearAndTypeForArticle);


module.exports = router;
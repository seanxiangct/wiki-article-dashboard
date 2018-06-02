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
router.get('/individualmodal', controller.individualModal);

// author
router.get('/authorSearchResult', controller.authorSearchResult);
router.get('/authorTable', controller.authorTable);


// data acquisition routes
router.get('/groupBar', controller.getGroupBarData);
router.get('/groupPie', controller.getGroupPieData);
router.get('/individualBar', controller.getIndividualBarData);
router.get('/individualPie', controller.getIndividualPieData);
router.get('/individualUserBar', controller.getIndividualBarDataTopUsers);
router.get('/individualSelectedUserBar', controller.getIndividualBarDataSelectedUsers);
router.get('/top5Users', controller.getTop5Users);


module.exports = router;
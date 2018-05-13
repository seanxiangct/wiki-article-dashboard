var express = require('express')
var controller = require('../controllers/revision.server.controller')
var router = express.Router()

router.get('/', controller.showLandingPage)
router.get('/signUp', controller.signUp)

module.exports = router
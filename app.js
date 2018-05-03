var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var survey = require('../COMP5347/app/routes/survey.server.route');
var surveysession = require('./app/routes/surveysession.server.routes');

// test commit AB
var app = express();
app.locals.products=['iphone 7', 'huawei p9', 'Pixel XL', 'Samsung S7'];
app.locals.surveyresults = {
    fp:[0,0,0,0],
    mp:[0,0,0,0]
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('views', path.join(__dirname,'/app/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({secret: 'ssshhhh', cookie: {maxAge: 600000}}));
app.use('/', survey);
app.use('/session', surveysession);
app.listen(3000, function () {
    console.log('survey app listening to port 3000!')
});


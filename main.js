/**
 * The file to start a server
 *
 */

var express = require('express');
var path = require('path');
var body_parser = require('body-parser');

var routes = require('./app/routes/router');

var app = express();

app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());
app.set('views', path.join(__dirname,'/app/views'));
app.use(express.static(path.join(__dirname, '/public')));


app.use('/',routes);
app.listen(3000, function () {
	  console.log('Revision app listening on port 3000!')
	});
	
module.exports = app;
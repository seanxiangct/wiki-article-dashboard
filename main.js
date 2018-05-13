/**
 * The file to start a server
 *
 */

var express = require('express');
var path = require('path');

var routes = require('./app/routes/revision.server.routes');

var app = express();

app.set('views', path.join(__dirname,'/app/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/',routes);
app.listen(3000, function () {
	  console.log('Revision app listening on port 3000!')
	});
	
module.exports = app;
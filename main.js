/**
 * The file to start a server
 *
 */

// load packages
const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
//const passport = require('passport');

// load express router
var routes = require('./app/routes/router');

var app = express();

app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());
app.set('views', path.join(__dirname,'/app/views'));
app.use(express.static(path.join(__dirname, '/public')));

// middlewares

// express session 
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
    })
);

// express messages
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
        
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        
        return {
            param : formParam, 
            msg: msg,
            value: value
        };
    }
}))


// Min trying to get user input
//app.post("/analytics", function (req, res) {
//    console.log(req.body.numArticle);
//   app.locals.numArticle = req.body.numArticle;
//    console.log(numArticle);
//});

// passport config
//require('./app/config/passport')(passport);
//app.use(passport.initialize());
//app.use(passport.session());

// home route
app.use('/',routes);
app.listen(3000, function () {
	  console.log('Revision app listening on port 3000!')
	});
	
module.exports = app;
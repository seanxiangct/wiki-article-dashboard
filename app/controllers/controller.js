var Revision = require("../models/revision");
var User = require('../models/user');


// landing page functions

module.exports.showLandingPage = function(req, res)
{
	res.render('landing.ejs')
}

// POST method, data contains in the resquest body
module.exports.signUp = function(req, res)
{
    const first = req.body.user.first;
    const last = req.body.user.last;
    const email = req.body.user.email;
    const name = req.body.user.name;
    const psw = req.body.user.psw;
    const psw2 = req.body.user.repeat;
    
    
    let data = {
        'fisrt': first,
        'last': last,
        'email': email,
        'name': name,
        'psw': psw
    };
    
    // validate sign up form
    
    User.signUp(data, function(err, result){

        if (err) {
            console.log('Cannot create new account with error code' + err);
        } else {
            req.flash('success', 'User registered!');
            res.redirect('/');
        }
    })       
    

}

module.exports.signIn = function(req, res)
{
    let data = {
        'name': req.body.user.name,
        'psw': req.body.user.psw
    };
    
    User.signIn(data, function(err, result){
        
        if (err) {
            console.log('Cannot sign in with error code' + err);
        } else {
            let user = result[0];
            if (user)
            {
                req.flash('success', 'Signed in!');
                res.render('analytics.ejs');
            } else {
                res.redirect('/');
            }
        }
    })
}


// Analytics page functions
module.exports.showAnalyticsPage = function(req, res)
{
    //res.render('analytics.ejs')
    Revision.findTitleHighestNoRev(3, function(err, result){
        if (err){
			console.log("Cannot find the most revised articles!")
		}else{
			// console.log(result)
			res.send(result)
		}
    })
}


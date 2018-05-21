const Revision = require("../models/revision");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const promise = require('bluebird');

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
    
    
    var data = {
        'first': first,
        'last': last,
        'email': email,
        'name': name,
        'psw': psw
    };
    
//    hash password
//    bcrypt.genSalt(10, function(err, salt) {
//        bcrypt.hash(data.psw, salt, function(err, hash) {
//            if (err) {
//                console.log(err);
//            }
//            data.psw = hash;
//        });
//    });
    
    User.save_user_data(data, function(err, result){

        if (err) {
            // error code 11000: duplicate unique key
            if (err.code == 11000) {
                req.flash('danger', 'User already exists!');
                res.redirect('/');
            }  
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
                res.redirect('/analytics');
            } else {
                req.flash('danger', 'Incorrect username or password!');
                res.redirect('/');
            }
        }
    })
}

// Analytics page functions
module.exports.showAnalyticsPage = function(req, res)
{
    Revision.findTitleHighestNoRev(3, function(err, result){
        if (err){
			console.log("Cannot find the most revised articles!");
            res.redirect('/');
		}else{
            var titleHighestNoRev = [];
            for (let i = 0, size = result.length; i < size; i++)
            {
                titleHighestNoRev[i] = result[i];
                console.log(titleHighestNoRev[i]);
            }
            
            Revision.findTitleHighestAge(3, function(err, result){
                if (err){
                    res.render('analytics.ejs', { top_revisions: titleHighestNoRev })
			        console.log("Cannot find the oldest articles!")
		        }else{
                    var titleHighestAge = [];
                    var firstRevDate = [];
                    for (let i = 0, size = result.length; i < size; i++)
                    {   
                        // findTitleHighestAge returns title and firstRevision (timestamp as a string)
                        // subtracting current date time from firstRevision returns difference in milliseconds
                        // convert to years by dividing by 1000 milliseconds * 60 sec * 60 mins * 24 hrs * 365 days
                        firstRevDate[i] = (new Date() - new Date(result[i].firstRevision))/(1000*60*60*24*365);
                        firstRevDate[i] = firstRevDate[i].toFixed(2);
                        titleHighestAge.push({title: result[i]._id, age: firstRevDate[i]})
                        console.log(titleHighestAge[i]);
                    }
                    res.render('analytics.ejs', {top_revisions: titleHighestNoRev, oldest_articles: titleHighestAge})
                }
            })
		}
    })
}
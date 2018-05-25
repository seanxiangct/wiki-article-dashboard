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
    Revision.findTitleHighestNoRev(3, function(err, titleHighestNoRev){
        if (err){
           console.log("Cannot find the most revised articles!");
           res.redirect('/');
       }else{

        Revision.findTitleHighestAge(3, function(err, titleHighestAge){
            if (err){
                console.log("Cannot find the oldest articles!")
                res.render('analytics.ejs', { top_revisions: titleHighestNoRev })
            }else{

                    // post-process date data
                    var msecToYear = 31536000000;
                    for (let i = 0, size = titleHighestAge.length; i < size; i++)
                    {   
                        // findTitleHighestAge returns title and firstRevision (timestamp as a string)
                        // subtracting current date time from firstRevision returns difference in milliseconds
                        // convert to years by dividing by 1000 milliseconds * 60 sec * 60 mins * 24 hrs * 365 days
                        let firstRevDate = (new Date() - new Date(titleHighestAge[i].firstRevision)) / msecToYear;
                        firstRevDate = firstRevDate.toFixed(2);
                        titleHighestAge[i] = {title: titleHighestAge[i]._id, age: firstRevDate};
                    }

                    // get user counts
                    Promise.all([
                        Revision.find({type: 'admin'}).count(),
                        Revision.find({type: 'anon'}).count(),
                        Revision.find({type: 'bot'}).count(),
                        Revision.find({type: 'reg'}).count()
                        ]).then(function(user_counts) {
                            user_counts = JSON.stringify({
                                admin: user_counts[0],
                                anon: user_counts[1],
                                bot: user_counts[2],
                                reg: user_counts[3]
                            });

                            console.log(user_counts);
                            res.render('analytics.ejs', {top_revisions: titleHighestNoRev, oldest_articles: titleHighestAge, user_counts: user_counts})
                        }).catch(function(err) {
                            console.log("Cannot count users");
                            res.render('analytics.ejs', {top_revisions: titleHighestNoRev, oldest_articles: titleHighestAge})
                        })

                }
            })
        }
    })
}
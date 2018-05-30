const Revision = require("../models/revision");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
//const wdk = require('wikidata-sdk');
var bot = require('nodemw');

// pass configuration object
var client = new bot({
  protocol: 'https',           // Wikipedia now enforces HTTPS
  server: 'en.wikipedia.org',  // host name of MediaWiki-powered site
  path: '/w',                  // path to api.php script
  debug: false                 // is more verbose when set to true
});
   

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

module.exports.getGroupPieData = function(req, res)
{
    Promise.all([
        Revision.totalNumRevForUser('admin'),
        Revision.totalNumRevForUser('anon'),
        Revision.totalNumRevForUser('bot'),
        Revision.totalNumRevForUser('reg')
        ]).then(function(user_counts) {
            user_counts = {
                'Admin': user_counts[0],
                'Anonymous': user_counts[1],
                'Bot': user_counts[2],
                'Regular': user_counts[3]
            };
            res.json(user_counts)
        }).catch(function(err) {
            console.log("Cannot cannot get group pie data");
        });
}

module.exports.getGroupBarData = function(req, res)
{
    Revision.findByYearAndType()
    .then(function(result) {
        res.json(result);
    }).catch(function(err) {
        console.log("Cannot get group bar data");
    })
}

module.exports.getIndividualBarData = function(req, res)
{
    Revision.findByYearAndTypeForArticle(req.query.title)
    .then(function(result) {
        res.json(result);
    }).catch(function(err) {
        console.log("Cannot get individual bar data");
    })

}

module.exports.getIndividualBarDataTopUsers = function(req, res)
{
    // find the top n users for this article
    var title = req.query.title;
    Revision.topNUsersForArticle(title, 5)
    .then(function(result) {
        // find the revision number for each user
        // generate promises
        promises = []
        user_names = []
        for (var i in result)
        {
            user_names.push(result[i]._id);
            promises.push(Revision.numRevByYear(title, user_names[i]));
        }
        Promise.all(promises)
        .then(function(user_counts) {
            var data = [];
            // unpack data
            for (var j in user_counts)
            {
                data[j] = [
                    user_names[j],
                    user_counts[j]
                ]
            }
            res.json(data);
        }).catch(function(err) {
            console.log("Cannot cannot get group pie data");
        });

    }).catch(function(err) {
        console.log('Cannot get individual user bar data');
    })
    .then()

}

module.exports.getIndividualPieData = function(req, res)
{
    var title = req.query.title;
    Promise.all([
        Revision.totalNumRevForUserAndArticle(title, 'admin'),
        Revision.totalNumRevForUserAndArticle(title, 'anon'),
        Revision.totalNumRevForUserAndArticle(title, 'bot'),
        Revision.totalNumRevForUserAndArticle(title, 'reg'),
        ]).then(function(user_counts) {
            user_counts = {
                'Admin': user_counts[0],
                'Anonymous': user_counts[1],
                'Bot': user_counts[2],
                'Regular': user_counts[3]
            };
            res.json(user_counts)
        }).catch(function(err) {
            console.log("Cannot count users");
        });
}

// Analytics page functions
module.exports.showAnalyticsPage = function(req, res)
{
    var highestRevRes = [];
    var lowestRevRes = [];
    var highestUniqueUserRes = [];
    var lowestUniqueUserRes = [];
    var highestAgeRes = [];
    var lowestAgeRes = [];
    
    Promise.resolve(Revision.findTitleHighestNoRev(3))
    .then(undefined, function(err) {
        console.log(err);
        highestRevRes.push({_id: "Cannot find the most revised articles!"})
    })
    .then(function(titleHighestNoRev) {
        for (let i = 0, size = titleHighestNoRev.length; i < size; i++) { 
        highestRevRes[i] = titleHighestNoRev[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestNoRev(3));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestRevRes.push({_id: "Cannot find the least revised articles!"})
    })
    .then(function(titleLowestNoRev) {
        for (let i = 0, size = titleLowestNoRev.length; i < size; i++) { 
        lowestRevRes[i] = titleLowestNoRev[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleHighestUniqueUsers(1));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        highestUniqueUserRes.push({_id: "Cannot find the most popular articles!"})
    })
    .then(function(titleHighestUniqueUsers) {
        for (let i = 0, size = titleHighestUniqueUsers.length; i < size; i++) { 
        highestUniqueUserRes[i] = titleHighestUniqueUsers[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestUniqueUsers(1));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestUniqueUserRes.push({_id: "Cannot find the least popular articles!"})
    })
    .then(function(titleLowestUniqueUsers) {
        for (let i = 0, size = titleLowestUniqueUsers.length; i < size; i++) { 
        lowestUniqueUserRes[i] = titleLowestUniqueUsers[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleHighestAge(3));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        highestAgeRes.push({title: "Cannot find the oldest articles!"});
    })
    .then(function(titleHighestAge) {
        var msecToYear = 31536000000;
        for (let i = 0, size = titleHighestAge.length; i < size; i++) {   
            // findTitleHighestAge returns title and firstRevision (timestamp as a string)
            // subtracting current date time from firstRevision returns difference in milliseconds
            // convert to years by dividing by 1000 milliseconds * 60 sec * 60 mins * 24 hrs * 365 days
            let firstRevDate = (new Date() - new Date(titleHighestAge[i].firstRevision)) / msecToYear;
            firstRevDate = firstRevDate.toFixed(2);
            highestAgeRes[i] = {title: titleHighestAge[i]._id, age: firstRevDate};
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestAge(3));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestAgeRes.push({title: "Cannot find the youngest articles!"});
    })
    .then(function(titleLowestAge) {
        var msecToYear = 31536000000;
        for (let i = 0, size = titleLowestAge.length; i < size; i++) {   
            // findTitleLowestAge returns title and firstRevision (timestamp as a string)
            // subtracting current date time from firstRevision returns difference in milliseconds
            // convert to years by dividing by 1000 milliseconds * 60 sec * 60 mins * 24 hrs * 365 days
            let firstRevDate = (new Date() - new Date(titleLowestAge[i].firstRevision)) / msecToYear;
            firstRevDate = firstRevDate.toFixed(2);
            lowestAgeRes[i] = {title: titleLowestAge[i]._id, age: firstRevDate};
        }
    })
    .then(function() {
        // console.log(highestRevRes);
        // console.log(lowestRevRes);
        // console.log(highestUniqueUserRes);
        // console.log(lowestUniqueUserRes);
        // console.log(highestAgeRes);
        // console.log(lowestAgeRes);

        res.render('analytics.ejs', {top_revisions: highestRevRes, bottom_revisions: lowestRevRes, top_regUsers: highestUniqueUserRes, bottom_regUsers: lowestUniqueUserRes, oldest_articles: highestAgeRes, youngest_articles: lowestAgeRes});
    })
}

module.exports.numRevision = function(req, res)
{
    var number = Number(req.query.number);
    console.log(number);
    var highestRevRes = [];
    var lowestRevRes = [];

    Promise.resolve(Revision.findTitleHighestNoRev(number))
    .then(undefined, function(err) {
        console.log(err);
        highestRevRes.push({_id: "Cannot find the most revised articles!"})
    })
    .then(function(titleHighestNoRev) {
        for (let i = 0, size = titleHighestNoRev.length; i < size; i++) { 
        highestRevRes[i] = titleHighestNoRev[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestNoRev(number));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestRevRes.push({_id: "Cannot find the least revised articles!"})
    })
    .then(function(titleLowestNoRev) {
        for (let i = 0, size = titleLowestNoRev.length; i < size; i++) { 
        lowestRevRes[i] = titleLowestNoRev[i];
        }
    })
    .then(function() {
        res.render('templates/numrevision.ejs', { top_revisions: highestRevRes, bottom_revisions: lowestRevRes });
    })
}

module.exports.numPopular = function(req, res)
{
    var number = Number(req.query.number);
    console.log(number);
    var highestUniqueUserRes = [];
    var lowestUniqueUserRes = [];

    Promise.resolve(Revision.findTitleHighestUniqueUsers(number))
    .then(undefined, function(err) {
        console.log(err);
        highestUniqueUserRes.push({_id: "Cannot find the most popular articles!"})
    })
    .then(function(titleHighestUniqueUsers) {
        for (let i = 0, size = titleHighestUniqueUsers.length; i < size; i++) { 
        highestUniqueUserRes[i] = titleHighestUniqueUsers[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestUniqueUsers(number));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestUniqueUserRes.push({_id: "Cannot find the least popular articles!"})
    })
    .then(function(titleLowestUniqueUsers) {
        for (let i = 0, size = titleLowestUniqueUsers.length; i < size; i++) { 
        lowestUniqueUserRes[i] = titleLowestUniqueUsers[i];
        }
    })
    .then(function() {
        console.log(highestUniqueUserRes);
        console.log(lowestUniqueUserRes);
        res.render('templates/popular.ejs', { top_regUsers: highestUniqueUserRes, bottom_regUsers: lowestUniqueUserRes });
    })
}

module.exports.numAge = function(req, res)
{
    var number = Number(req.query.number);
    console.log(number);
    var highestAgeRes = [];
    var lowestAgeRes = [];

    Promise.resolve(Revision.findTitleHighestAge(number))
    .then(undefined, function(err) {
        console.log(err);
        highestAgeRes.push({title: "Cannot find the oldest articles!"});
    })
    .then(function(titleHighestAge) {
        var msecToYear = 31536000000;
        for (let i = 0, size = titleHighestAge.length; i < size; i++) {   
            // findTitleHighestAge returns title and firstRevision (timestamp as a string)
            // subtracting current date time from firstRevision returns difference in milliseconds
            // convert to years by dividing by 1000 milliseconds * 60 sec * 60 mins * 24 hrs * 365 days
            let firstRevDate = (new Date() - new Date(titleHighestAge[i].firstRevision)) / msecToYear;
            firstRevDate = firstRevDate.toFixed(2);
            highestAgeRes[i] = {title: titleHighestAge[i]._id, age: firstRevDate};
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestAge(number));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestAgeRes.push({title: "Cannot find the youngest articles!"});
    })
    .then(function(titleLowestAge) {
        var msecToYear = 31536000000;
        for (let i = 0, size = titleLowestAge.length; i < size; i++) {   
            // findTitleLowestAge returns title and firstRevision (timestamp as a string)
            // subtracting current date time from firstRevision returns difference in milliseconds
            // convert to years by dividing by 1000 milliseconds * 60 sec * 60 mins * 24 hrs * 365 days
            let firstRevDate = (new Date() - new Date(titleLowestAge[i].firstRevision)) / msecToYear;
            firstRevDate = firstRevDate.toFixed(2);
            lowestAgeRes[i] = {title: titleLowestAge[i]._id, age: firstRevDate};
        }
    })
    .then(function() {
        res.render('templates/age.ejs', {oldest_articles: highestAgeRes, youngest_articles: lowestAgeRes});
    })
}

module.exports.individualPage = function(req, res) 
{
    var titleList = [];
    Promise.resolve(Revision.findTitleNames())
    .then(undefined, function(err) {
        console.log(err);
        
    })
    .then(function(distinctTitles) {
        for (let i = 0, size = distinctTitles.length; i < size; i++) { 
        titleList[i] = distinctTitles[i];
        }
        // console.log(titleList);
    })
    .then(function() {
        res.render('templates/individual.ejs', {titleOptions : titleList});
    })
    
}

module.exports.individualResult = function(req,res)
{
    var title = req.query.title;
    var numRev;
    var topUsers = [];
    console.log(title); //why print twice???
   
    Promise.resolve(Revision.totalNumRev(title))
    .then(undefined, function(err) {
        console.log(err);  
    })
    .then(function(totalNumRev) {
        numRev = totalNumRev;
        // console.log(numRev); 
    })
    .then(function(){
        return new Promise(function(resolve, reject) {
            resolve(Revision.topRevisionRegUsers(title));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
    })
    .then(function(top5RegUsers) {
        for (let i = 0, size = top5RegUsers.length; i < size; i++) { 
        topUsers[i] = top5RegUsers[i];
        }
        res.render('templates/individualresult.ejs', {title: title, numRev: numRev, topUsers: topUsers});
    })
}


module.exports.individualModal = function(req, res) 
{
    var title = req.query.title;
    var latestRevTime;

    Promise.resolve(Revision.findTitleLatestRev(title))
    .then(undefined, function(err) {
        console.log(err);  
    })
    .then(function(latestRev) {
        latestRevTime = latestRev[0].timestamp.toISOString();
        //console.log(latestRevTime); 

        client.getArticleRevisions(title, latestRevTime, function(err, data) {
            // error handling
            if (err) {
              console.log(err);
              return;
            } else {
                dlNum = String(data.length - 1);
                console.log(data);
                // insert data to db
                  
                  

                res.render('templates/modal.ejs', {downloadNum: dlNum});
            }
          });

    })
}
var Revision = require("../models/revision")
var User = require('../models/user')

module.exports.showTitleForm = function(req,res)
{
	res.render("titleForm.pug")
}

module.exports.getLatest = function(req,res)
{
	title = req.query.title;
    console.log(title);

	Revision.findTitleLatestRev(title, function(err,result){
		
		if (err){
			console.log("Cannot find " + title + ",s latest revision!")
		}else{
			// console.log(result)
			revision = result[0];
			console.log(revision);
			res.render('revision.pug',{title: title, revision:revision})
		}	
	})	

}

// landing page functions

module.exports.showLandingPage = function(req, res)
{
	res.render('landing_page.ejs')
}

module.exports.signUp = function(req, res)
{
	data = req.query;
    console.log(data);
    
    User.signUp(data, function(err, result){
        
        if (err) {
            console.log('Cannot create new account with error code' + err);
        } else {
            console.log(result);
            res.render('landing_page.ejs');
        }
    })
}

module.exports.signIn = function(req, res)
{
    username = req.query.username;
    psw = req.query.psw;
    
    User.signIn(username, psw, function(err, result){
        
        if (err) {
            console.log('Cannot sign in with error code' + err);
        } else {
            user = result[0];
            if (user)
            {
                res.render('analytics.ejs');
            } else {
                res.render('landing_page.ejs');
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


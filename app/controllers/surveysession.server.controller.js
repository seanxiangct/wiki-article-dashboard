var express = require('express');

module.exports.showForm = function(req, res) {
    products = req.app.locals.products;
    res.render('surveysession.ejs', {products: products});
};

module.exports.showResult = function(req, res) {

    products = req.app.locals.products;
    surveyresults = req.app.locals.surveyresults;
    sess = req.session;
    if ( 'vote' in sess) {
        res.render('surveysessionresult.ejs', { products: products, surveyresults: surveyresults});
    }
    else {
        sess.vote = req.body.vote;

        if (req.body.gender == 0)
            surveyresults.mp[req.body.vote]++;
        else
            surveyresults.fp[req.body.vote]++;
        res.render('surveyresult.ejs', { products: products, surveyresults: surveyresults})
    }
};


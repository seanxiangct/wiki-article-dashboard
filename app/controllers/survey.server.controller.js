var express = require('express');

module.exports.showForm=function (req, res) {

    products = req.app.locals.products;
    res.render('survey.ejs',{products:products});
};

module.exports.showResult=function (req, res) {

    products = req.app.locals.products;
    surveyresults = req.app.locals.surveyresults;


    if(req.body.gender==1){
        surveyresults.fp[req.body.vote]++;
    }


    if(req.body.gender==0){
        surveyresults.mp[req.body.vote]++;
    }

    res.render('surveyresult.ejs', {products: products, surveyresults: surveyresults});
};

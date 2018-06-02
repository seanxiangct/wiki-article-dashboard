/**
 * Revision schema
 */
const mongoose = require('./db');
const Promise = require('bluebird');

var RevisionSchema = new mongoose.Schema(
		{
			title: String, 
		 	timestamp:Date, 
		 	user:String, 
		 	anon:String,
		 	type:String
		},
		{
		 	versionKey: false
		}
	);


// find the latest revision of an article 
RevisionSchema.statics.findTitleLatestRev = function(title)
{
	return this.find({title:title})
	.sort({timestamp:-1})
	.limit(1)
}


// find the highest number of revisions
RevisionSchema.statics.findTitleHighestNoRev = function(number){
	return this.aggregate()
	.group({_id:"$title", numOfEdits: {$sum:1}})
	.sort('-numOfEdits')
	.limit(number)
	.exec()
}
// find the lowest number of revisions
RevisionSchema.statics.findTitleLowestNoRev = function(number){
	return this.aggregate()
	.group({_id:"$title", numOfEdits: {$sum:1}})
	.sort('numOfEdits')
	.limit(number)
	.exec()
}

RevisionSchema.statics.countAdmin = function (callback) {
	return this.find({type: 'admin'}).count().exec(callback)
}

// find the title with largest group of unique regular users
RevisionSchema.statics.findTitleHighestUniqueUsers = function(number){
	return this.aggregate()
	.match({type:"reg"})
	.group({_id:"$title", uniqueUsers:{$addToSet:"$user"}})
	.unwind("uniqueUsers")
	.group({_id:"$_id",noUniqueUsers:{$sum:1}})
	.sort({"noUniqueUsers":-1})
	.limit(number)
	.exec()
}

// find the title with smallest group of unique regular users
RevisionSchema.statics.findTitleLowestUniqueUsers = function(number){
	return this.aggregate()
	.match({type:"reg"})
	.group({_id:"$title", uniqueUsers:{$addToSet:"$user"}})
	.unwind("uniqueUsers")
	.group({_id:"$_id",noUniqueUsers:{$sum:1}})
	.sort({"noUniqueUsers":1})
	.limit(number)
	.exec()
}

// find the titles with the highest age
RevisionSchema.statics.findTitleHighestAge = function(number){
	return this.aggregate()
	// sort prior to $group stage so that $first is meaningful
	.sort({'timestamp':1})
	.group({_id:"$title", firstRevision: {$first:"$timestamp"}})
	.sort({'firstRevision':1})
	.limit(number)
	.exec()
}

// find the titles with the lowest age
RevisionSchema.statics.findTitleLowestAge = function(number){
	return this.aggregate()
	// sort prior to $group stage so that $first is meaningful
	.sort({'timestamp':1})
	.group({_id:"$title", firstRevision: {$first:"$timestamp"}})
	.sort({'firstRevision':-1})
	.limit(number)
	.exec()
}



RevisionSchema.statics.findByYearAndType = function()
{
    return this.aggregate()
    .group({
    	_id: {
    		year: {$year: "$timestamp"},
    		user_type: '$type'
    	},
    	count: {$sum: 1}
    })
    .sort({
    	'_id.year': 1,
    	'user_type': 1
    })
    .exec()

}

RevisionSchema.statics.findByYearAndTypeForArticle = function(title)
{

    return this.aggregate()
    .match({
    	title: title
    })
    .group({
    	_id: {
    		year: {$year: "$timestamp"},
    		user_type: '$type'
    	},
    	count: {$sum: 1}
    })
    .sort({
    	'_id.year': 1,
    	'user_type': 1
    })
    .exec()
}

RevisionSchema.statics.topNUsersForArticle = function(title, n)
{
	return Revision.aggregate(
        [
    		{
    			$match : {
    				title: title
    			}
    		},
            {
                $group : {
                   _id : '$user',
                   count: { $sum: 1 }
                }
            },
            {
              	$sort : {'count': -1}
            },
            {
            		$limit : n
            }
        ]
    )
}

RevisionSchema.statics.numRevByYear = function(title, user)
{
	return Revision.aggregate(
        [
    		{
    			$match : {
    				title: title,
    				user: user
    			}
    		},
            {
                $group : {
                   _id : { year: { $year: "$timestamp" } },
                   count: { $sum: 1 }
                }
            },
            {
            	$sort : { '_id.year': 1 }
            }
        ]
    )
}

RevisionSchema.statics.totalNumRevForUser = function(type)
{
	return this.find({type: type}).count()
}

RevisionSchema.statics.totalNumRevForUserAndArticle = function(title, type)
{
	return this.find({title: title, type: type}).count()
}

// find distinc title names
RevisionSchema.statics.findTitleNames = function()
{
	return this.distinct('title')
}

// find distinct user names
RevisionSchema.statics.findUserNames = function()
{
	return this.distinct('user')
}

// find titles changed by specific user
RevisionSchema.statics.findArticleChanges = function(user)
{
	return this.aggregate()
	.match({user: user})
	.group({_id:"$title", numOfEdits: {$sum:1}})
	.sort('-numOfEdits')
	.exec()
}

// find revisions for specific user for specific title
RevisionSchema.statics.findUserRevisions = function(user)
{
	return this.aggregate()
	.match({user: user})
	.sort({timestamp:-1})
	.exec()
}

// find title names and number of revisions
RevisionSchema.statics.findTitleNamesRev = function()
{
	return this.aggregate()
	.group({_id:"$title", numOfEdits: {$sum:1}})
	.sort('_id')
	.exec()
}

RevisionSchema.statics.totalNumRev = function(title)
{
	return this.find({title: title}).count()
}

// find the titles with the lowest age
RevisionSchema.statics.topRevisionRegUsers = function(title){
	return this.aggregate()
	.match({title: title, type: 'reg'})
	.group({_id:"$user", numOfEdits: {$sum:1}})
	.sort('-numOfEdits')
	.limit(5)
	.exec()
}

// model is a schema binded with a collection
// Schema.model(model_name, schema variable, collection name)
// Mongoose automatically looks for the plural version of the model name
// therefore the third argument of the model function is optional 
// if the database is defined properly 
var Revision = mongoose.model('Revision', RevisionSchema)

module.exports = Revision
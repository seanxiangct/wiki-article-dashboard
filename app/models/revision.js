/**
 * Revision schema
 */
var mongoose = require('./db')

var RevisionSchema = new mongoose.Schema(
		{
			title: String, 
		 	timestamp:Date, 
		 	user:String, 
		 	anon:String
		},
		{
		 	versionKey: false
		}
	)


// find the latest revision of an article 
RevisionSchema.statics.findTitleLatestRev = function(title, callback)
{
	return this.find({'title':title})
	.sort({'timestamp':-1})
	.limit(1)
	.exec(callback)
}


// find the highest number of revisions
RevisionSchema.statics.findTitleHighestNoRev = function(number, callback){
	return this.aggregate()
	.group({_id:"$title", numOfEdits: {$sum:1}})
	.sort('-numOfEdits')
	.limit(number)
	.exec(callback)
}

// retrive the number of users for each type
RevisionSchema.statics.countAllUsers = function (callback) {
//    return this.aggregate()
//    .group({
//        'user'
//    })
}


// find the titles with the highest age
RevisionSchema.statics.findTitleHighestAge = function(number, callback){
	return this.aggregate()
	// sort prior to $group stage so that $first is meaningful
	.sort({'timestamp':1})
	//set a reasonable limit to avoid query execution failure
	.limit(1000)
	.group({_id:"$title", firstRevision: {$first:"$timestamp"}})
	.sort({'firstRevision':1})
	.limit(number)
	.exec(callback)
}


// model is a schema binded with a collection
// Schema.model(model_name, schema variable, collection name)
// Mongoose automatically looks for the plural version of the model name
// therefore the third argument of the model function is optional 
// if the database is defined properly 
var Revision = mongoose.model('Revision', RevisionSchema)

module.exports = Revision
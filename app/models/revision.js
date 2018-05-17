/**
 * Revision schema
 */
var mongoose = require('./db')

var RevisionSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:Date, 
		 user:String, 
		 anon:String},
		 {
		 	versionKey: false
		})


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
	console.log('access fuction')
	return this.aggregate()
	.group({_id:"$title", numOfEdits: {$sum:1}})
	.sort('-numOfEdits')
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
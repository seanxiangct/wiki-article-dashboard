/**
 * 
 */
var mongoose = require('./db')

// abstract schema 

// schema for wiki articles revisions
var RevisionSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:String, 
		 user:String, 
		 anon:String},
		 {
		 	versionKey: false
		})

// schema for storing user information
var UserSchema = new mongoose.Schema(
		{
			username: String,
			password: String,
			email: String,
			first_name: String,
			last_name: String
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

// Sign up
UserSchema.statics.signUp = function(callback) 
{
	return this.insert
}


// model is a schema binded with a collection
// Schema.model(model_name, schema variable, collection name)
// Mongoose automatically looks for the plural version of the model name
// therefore the third argument of the model function is optional 
// if the database is defined properly 
var Revision = mongoose.model('Revision', RevisionSchema)

module.exports = Revision
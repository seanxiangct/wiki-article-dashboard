/**
 * User schema
 */
var mongoose = require('./db')

// schema for storing user information
var UserSchema = new mongoose.Schema(
        {
            username: { type: String, required: true, index: { unique: true } },
            password: { type: String, required: true },
            email: String,
            first_name: String,
            last_name: String
        }
    )
 

// Sign up
UserSchema.statics.signUp = function(data, callback) 
{
    var new_user = new User(
        {
            username: data.username,
            password: data.psw,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name
        }
    )
    return new_user.save()
}

// model is a schema binded with a collection
// Schema.model(model_name, schema variable, collection name)
// Mongoose automatically looks for the plural version of the model name
// therefore the third argument of the model function is optional 
// if the database is defined properly 
var User = mongoose.model('User', UserSchema)  


module.exports = User
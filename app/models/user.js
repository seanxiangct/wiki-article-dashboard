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
            username: data.name,
            password: data.psw,
            email: data.email,
            first_name: data.first,
            last_name: data.last
        }
    )
    new_user.save(function(err){
        if (err)
            console.log(err)
        callback();
    });
    
//    return new_user.save()
}

// Sign in
UserSchema.statics.signIn = function(data, callback)
{
    return this.find({
        'username': data.name,
        'password': data.psw
    }).exec(callback)
}

// model is a schema binded with a collection
// Schema.model(model_name, schema variable, collection name)
// Mongoose automatically looks for the plural version of the model name
// therefore the third argument of the model function is optional 
// if the database is defined properly 
var User = mongoose.model('User', UserSchema)  


module.exports = User
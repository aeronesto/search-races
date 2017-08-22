var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var randtoken = require('rand-token');
var Schema = mongoose.Schema;

// mongoose.Promise = require('bluebird');

// var UserSchema = new Schema({
var UserSchema = mongoose.Schema({ // how the data looks in database
		local: {
			username: String,
			password: String
		},
		facebook: {
			id: String,
			token: String,
			email: String,
			name: String
		},
		google: {
			id: String,
			token: String,
			email: String,
			name: String
		},
		token: { // schema called token
			type: Schema.Types.ObjectId, // we're saving an object ID
			ref: 'Token', // save token unique  identifier (similar to join in MySQL)
			default: null
		}
	});

// token schema
var TokenSchema = mongoose.Schema({
	value: String,
	user: { // so we know which user owns this token
		type: Schema.Types.ObjectId, // user has the type that we're storing here as an id
		ref: 'User' // similar to userSchema referencing the token
	},
	expireAt: {
		type: Date, // expiring only works with type date
		expires: 60, // 60 seconds
		default: Date.now // time is set to current time and expires after 60 s from that time
	}
});

// method accessible by any user that generates token
UserSchema.methods.generateToken = function(){
	var token = new Token(); // Token is the name of the tokenSchema model
	token.value = randtoken.generate(32); // 32 is the number of characters
	token.user = this._id; // when method is used, 'this' is the user that called the method, and every user is assigned an '_id' that is independent of how the user logged in.
	 	// This value can be used to query users to find the one where the _id matches, but mongoose makes it easier.
	this.token = token._id; // user.token = _id from database object
	this.save(function(err){ // save user that called method
		if(err)
			throw err;
		token.save(function(err){ // also save token
			if(err)
				throw err;
		});
	});
}

// generate hash
UserSchema.methods.generateHash = function(password){ // adds a salt to password
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9)); // salt is randomly generated text
	// a salt makes a hash password unique even if password is the same across multiple users
}

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

// UserSchema.statics.findOrCreate = function (params, done) {
UserSchema.statics.findOrCreate = function (params, done) {
	User.findOne({
			'google.id': params.google.id
		},
		function(err, user) {
			if (err) {
				return done(err);
			}
			//No user was found... so create a new user with values from Facebook (all the profile. stuff)
			if (!user) {
				user = new User({
					google: {id: params.google.id}
				});
			user.save(function(err) {
					if (err) console.log(err);
					return done(err, user);
				});
			} else {
				//found user. Return
				return done(err, user);
			}
		});
};

// in order to use these elsewhere, we need to export the schema's as models
var User = mongoose.model('User', UserSchema); // will be saved in to database as "users" collection once User.save() is used
var Token = mongoose.model('Token', TokenSchema);
var Models = { User: User, Token: Token };

module.exports = Models;
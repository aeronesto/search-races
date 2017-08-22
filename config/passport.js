// Strategies -----------------------------------------------------------------
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var BearerStrategy = require('passport-http-bearer').Strategy;

// models ---------------------------------------------------------------------
var User = require('../app/models/user').User;
var Token = require('../app/models/user').Token;
// var configAuth = require('./auth'); // need this for Google and Facebook Authentication

module.exports = function(passport) {

	passport.serializeUser(function(user, done){
		done(null, user.id); // Only save the user.id in the session data 
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'local.username': email}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				} 
				if (!req.user) { // if they are not logged in another way
					var newUser = new User();
					newUser.local.username = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				} 
				else { // they are logged in and are trying to merge local account
					var user = req.user;
					user.local.username = email;
					user.local.password = user.generateHash(password);

					user.save(function(err){
						if(err)
							throw err;
						return done(null, user);
					});
				}
			})

		});
	}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done){
			process.nextTick(function(){
				User.findOne({ 'local.username': email}, function(err, user){
					if(err)
						return done(err);
					if(!user)
						return done(null, false, req.flash('loginMessage', 'No User found'));
					if(!user.validPassword(password)){
						return done(null, false, req.flash('loginMessage', 'Invalid password'));
					}
					return done(null, user);
				});
			});
		}
	));

};
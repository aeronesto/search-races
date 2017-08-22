var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
// var randtoken = require('rand-token');
var Schema = mongoose.Schema;

// mongoose.Promise = require('bluebird');

// var YelpTokenSchema = new Schema({
var YelpTokenSchema = mongoose.Schema({ // how the data looks in database
    access_token: { 
    	type: String, 
    	required: true, 
    	unique: true 
    },
    token_type: { 
    	type: String, 
    	require: true 
    },
    expireAt: { 
    	type: Date, 
    	required: true 
    }
});

YelpTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 });

var Yelp_Token = mongoose.model('Yelp_Token', YelpTokenSchema, 'yelp_token');

module.exports = Yelp_Token;
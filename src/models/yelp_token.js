var mongoose = require('mongoose');
//replace deprecated mpromise
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var db = mongoose.createConnection(process.env.MONGOLAB_URI);

var yelpTokenSchema = new Schema({
    access_token: { type: String, required: true, unique: true },
    token_type: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    expireAt: { type: Date, expires: 1 }
});

yelpTokenSchema.index({'createdAt':1,}, {'expireAfterSeconds': 0});

var Yelp_Token = db.model('Yelp_Token', yelpTokenSchema, 'yelp_token');

module.exports = Yelp_Token;
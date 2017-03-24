var mongoose = require('mongoose');
//replace deprecated mpromise
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var db = mongoose.createConnection(process.env.MONGOLAB_URI);

var YelpTokenSchema = new Schema({
    access_token: { type: String, required: true, unique: true },
    token_type: { type: String, require: true },
    expireAt: { type: Date, required: true }
});

YelpTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 });

var Yelp_Token = db.model('Yelp_Token', YelpTokenSchema, 'yelp_token');

module.exports = Yelp_Token;
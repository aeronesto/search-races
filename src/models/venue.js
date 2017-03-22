var mongoose = require('mongoose');
//replace deprecated mpromise
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var db = mongoose.createConnection(process.env.MONGOLAB_URI);

var venueSchema = new Schema({
    yelp_id: { type: String, required: true, unique: true },
    number_of_users_going: { type: Number, default: 0 },
    users_going: { type: [String], default: [] },
    expirationDate: { type: Date, expires: 0 },
    createdAt: { type: Date, default: Date.now }
});

venueSchema.index({'expireAt':1,}, {'expireAfterSeconds': 0});

var Venue = db.model('Venue', venueSchema, 'venues');

module.exports = Venue;
var mongoose = require('mongoose');
//replace deprecated mpromise
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var db = mongoose.createConnection(process.env.MONGOLAB_URI);

var VenueSchema = new Schema({
    venueID: { type: String, required: true, unique: true },
    number_of_users_going: { type: Number, default: 0 },
    users_going: { type: [String], default: [] },
    expirationDate: { type: Date, expires: 0 },
    createdAt: { type: Date, default: Date.now }
});

VenueSchema.statics.findOrCreate = function (params, done) {
	Venue.findOne({
			'venueID': params.venueID
		},
		function(err, venue) {
			if (err) {
				return done(err);
			}
			
			if (!venue) {
				//expires tomorrow at 5:00:00 a.m.
				var d = new Date();         //current Date
				d.setDate(d.getDate() + 1)  //same time tomorrow
				d.setHours(10)               //10zulu, 5:XX:XX a.m. central standard time
				d.setMinutes(0)             //5:00:XX a.m.
				d.setSeconds(0)             //5:00:00 a.m.

				var expDate = d;

				venue = new Venue ({
					venueID: params.venueID,
        	expirationDate: expDate
				});
				venue.save(function(err) {
						if (err) console.log(err);
						return done(err, venue);
				});
			} else {
				//found venue. Return
				return done(err, venue);
			}
		});
};

VenueSchema.methods.toggleUserGoing = function (params, cb) {
	console.log('INSIDE VENUE.JS INSIDE TOGGLEUSERGOING:');
	//console.log('VENUE: ', this);
	//console.log('USERS GOING ARRAY: ', this.users_going);
	//console.log('USER ID: ', params.userID);
	var users_going = this.users_going.slice();
	var indexOfUser = users_going.indexOf(params.userID);
	var currentUser = undefined;

	//if user isn't in array, add to array
	if(indexOfUser > -1) {
		users_going.splice(indexOfUser, 1);
		this.number_of_users_going -= 1;
		currentUser = false;
	}

	//if user is in array, remove from array
	else {
		users_going.push(params.userID);
		this.number_of_users_going += 1;
		currentUser = true;
	}

	this.users_going = users_going.slice();
	this.save(function(err, updatedVenue) {
		if(err) 
			return cb(err, undefined, undefined);
		else
			return cb(null, updatedVenue, currentUser);
	})


};

VenueSchema.index({'expireAt':1,}, {'expireAfterSeconds': 0});

var Venue = db.model('Venue', VenueSchema, 'venues');

module.exports = Venue;
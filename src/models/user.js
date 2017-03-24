var mongoose = require('mongoose');
//replace deprecated mpromise
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var db = mongoose.createConnection(process.env.MONGOLAB_URI);

var UserSchema = new Schema({
    googleID: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

UserSchema.statics.findOrCreate = function (params, done) {
	User.findOne({
			'googleID': params.googleID
		},
		function(err, user) {
			if (err) {
				return done(err);
			}
			//No user was found... so create a new user with values from Facebook (all the profile. stuff)
			if (!user) {
				user = new User({
					googleID: params.googleID,
					displayName: params.displayName
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

var User = db.model('Users', UserSchema, 'users');

module.exports = User;
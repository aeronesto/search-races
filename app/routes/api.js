// models ---------------------------------------------------------------------
var Venue = require('../models/venue');

// controllers ----------------------------------------------------------------
var get_yelp_token = require('../controllers/yelp/get_yelp_token');
var query_yelp = require('../controllers/yelp/query_yelp');
var add_going_data_from_db = require('../controllers/yelp/add_going_data_from_db');

module.exports = function(router, passport){
	
	router.post('/toggle_going', function(req, res) {
		
		if (req.isAuthenticated()){
			Venue.findOrCreate({ venueID: req.body.venueID }, function(err, venue) {
				// venue is collection in database
				if(err) throw err;
				venue.toggleUserGoing({ userID: req.session.passport.user }, function(err, data, currentUser) {
					// data is the updated venue
					if(err)
						res.json({success: false, business: data}).end();
					else
						res.json({success: true, business: data, current_user_going: currentUser}).end();
				});
			});

		} else {
			res.json({ success: false, user: undefined, venue: req.body.venueID }).end();
		}
	});

	router.post('/location_search', get_yelp_token, query_yelp, add_going_data_from_db);

};
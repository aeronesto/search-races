var axios =require('axios');
var qs = require('querystring');
var queue = require('queue');
var read_yelp_token = require('../yelp_token/read_yelp_token');
var create_yelp_token = require('../yelp_token/create_yelp_token');

module.exports = function(req, res, next) {

    var q = queue({ concurrency: 1 });

    q.push(function(cb) {
    	// check for yelp token in db
        read_yelp_token(req, res, cb, next);

    }, function(cb) {
		// if not in the db, request a new token from yelp
        axios.post('https://api.yelp.com/oauth2/token', qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': process.env.APP_ID,
            'client_secret': process.env.APP_SECRET
        })).then(function(response) {
            // token received from yelp
            req.token_data = response.data;
            req.token = response.data.access_token;
            cb();
        }).catch(function(err) {
            cb(err);
        });
        
    }, function(cb) {
    	//save new token in the db
        create_yelp_token(req.token_data, cb);

    });

    q.start(function() {
        // finished processing
        next();
    });
};
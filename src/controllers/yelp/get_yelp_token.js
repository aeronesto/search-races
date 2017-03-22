var axios =require('axios');
var qs = require('querystring');
var queue = require('queue');
var read_yelp_token = require('../yelp_token/read_yelp_token');
var create_yelp_token = require('../yelp_token/create_yelp_token');

module.exports = function(req, res, next) {

    console.log('IN GET_YELP_TOKEN');

    var q = queue({ concurrency: 1 });

    //**async functions**
    //check database
    //get token from yelp
    //save token

    q.push(function(cb) {
        console.log('ASYNC 1: ');
        read_yelp_token(req, res, cb, next);

    }, function(cb) {
        console.log('ASYNC 2: ');

        // if token was found in the database, carry on
        // if(req.token)
        //    cb();
        
        axios.post('https://api.yelp.com/oauth2/token', qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': process.env.APP_ID,
            'client_secret': process.env.APP_SECRET
        })).then(function(response) {
            console.log('TOKEN RECEIVED FROM YELP');
            req.token_data = response.data;
            req.token = response.data.access_token;
            cb();
        }).catch(function(err) {
            cb(err);
        });
        
    }, function(cb) {

        console.log('ASYNC3: ');
        create_yelp_token(req.token_data, cb);

    });

    q.start(function() {
        console.log('Queue finished processing.');
        next();
    });
};
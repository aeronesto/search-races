var axios =require('axios');
var qs = require('querystring');
var read_token = require('../token/read_token');

module.exports = function(req, res, next) {

    console.log('IN QUERY_YELP');

    var url = 'https://api.yelp.com/v3/businesses/search';
    url += '?categories=bars';
    url += '&location=' + req.body.location;

    axios({
        method: 'get',
        url: url,
        headers: { 'Authorization': ('Bearer ' + req.token) }
    }).then(function(response) {
        res.json({success: true, businesses: response.data.businesses}).end();
    }).catch(function(err) {
        res.json({success: false}).end();
    });
}
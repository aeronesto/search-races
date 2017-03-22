var express = require('express');
var logger =require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//require('dotenv').config();

//var login = require('./src/controllers/auth/login');
//var logout = require('./src/controllers/auth/logout');
//var check_token = require('./src/controllers/auth/check_token');
var create_venue = require('./src/controllers/venue/create_venue');
var create_token = require('./src/controllers/token/create_token');
var get_yelp_token = require('./src/controllers/yelp/get_yelp_token');
var query_yelp = require('./src/controllers/yelp/query_yelp');

var app = express();

app.use(logger('tiny'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.post('/test/create_venue', create_venue);
//app.post('/test/create_token', create_token);

app.get('/favicon.ico', function(req, res) {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.use('/dist', express.static(path.join(__dirname, 'dist')));

//app.post('/login', login);
//app.post('/logout', logout);

app.post('/api/location_search', get_yelp_token, query_yelp);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
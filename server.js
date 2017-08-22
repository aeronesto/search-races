var express = require('express');
var app = express();

require('dotenv').config();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan'); 
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
var path = require('path');

// MongoDB connection ----------------------------------------------------------
var configDB = require('./config/database.js'); // DB URL
mongoose.connect(configDB.url); // tell mongoose to connect to server

// passport middleware ---------------------------------------------------------
require('./config/passport')(passport); // perform middleware on passport

// morgan logger ---------------------------------------------------------------
app.use(morgan('tiny'));

// authentication --------------------------------------------------------------
app.use(cookieParser()); // Set value of req.cookies variable
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true, // save even if nothing has changed
	saveUninitialized: true, // save sessions to permanent storage for persistent logging when server goes down.
	store: new MongoStore({ mongooseConnection: mongoose.connection, // use same connection as above for session
				 							ttl: 2 * 24 * 60 * 60 })}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// serve files ----------------------------------------------------------------
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// routes ----------------------------------------------------------------------
	// api ---------------------------------------------------------------------
	var api = express.Router();
	require('./app/routes/api.js')(api, passport);
	app.use('/api', api);

	// authentication process --------------------------------------------------
	var auth = express.Router();
	require('./app/routes/auth.js')(auth, passport);
	app.use('/auth', auth); // when user is not authenticated

	// authenticated -----------------------------------------------------------
	/*
	var secure = express.Router();
	require('./app/routes/secure.js')(secure, passport); // need to pass in passport for authentication
	app.use('/secure', secure); // when user is authenticated
	*/

	// unauthenticated ---------------------------------------------------------
	var public = express.Router();
	require('./app/routes/public.js')(public, passport);
	app.use('/', public); // when user may or may not be authenticated

// start server ---------------------------------------------------------------
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Server running on port " + port);
var path = require('path');

module.exports = function(router, passport){
	
	router.get('/', function(req, res){
		res.sendFile(path.join(__dirname, '../..', '/index.html'));
	});

	// =============================================================================
	// SIGNUP ======================================================================
	// =============================================================================

		router.get('/signup',function(req,res){
			res.sendFile(path.join(__dirname, '../..', '/index.html'));
		});

		router.post('/signup', passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/signup',
			failureFlash: true // if signup failed, we'll be requesting flash message back
		}));


	// =============================================================================
	// LOGIN =======================================================================
	// =============================================================================

    // locally --------------------------------

		router.get('/login', function(req, res){
			res.sendFile(path.join(__dirname, '../..', '/index.html'), { message: req.flash('loginMessage')});
		});

		router.post('/login', passport.authenticate('local-login', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true // if login failed
		}));

	// =============================================================================
	// LOGOUT ======================================================================
	// =============================================================================

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	// =============================================================================
	// USER STATUS =================================================================
	// =============================================================================

	router.post('/get_user', function(req, res){
		if (req.isAuthenticated()){
			res.json({success: true, user: req.session.passport.user}).end();
		} else {
			res.json({success: false, user: null }).end();
		}
	});

};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}
module.exports = {
	'facebookAuth': {
		'clientID': process.env.FB_CLIENT_ID,
		'clientSecret': process.env.FB_CLIENT_SECRET,
		'callbackURL': process.env.FB_CALLBACK_URL,
		'profileFields': ['id','emails', 'first_name', 'last_name', 'displayName']
	},
		'googleAuth': {
		'clientID': process.env.GOOGLE_CLIENT_ID,
		'clientSecret': process.env.GOOGLE_CLIENT_SECRET,
		'callbackURL': process.env.GOOGLE_CALLBACK_URL,
		'profileFields': ['profile', 'emails']
	}
}
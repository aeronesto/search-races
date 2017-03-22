var Token = require('../../models/token.js');

module.exports = function(req, res) {

    console.log('IN CREATE TOKEN');

    var newToken = new Token({
        access_token: req.body.access_token,
        token_type: req.body.token_type,
        expireAfterSeconds: (req.body.expires_in - 100)
    });

    newToken.save(function(err) {
        if(err) {
            console.log(err);
            res.status(304).end();
        }

        console.log('Token created!');

        res.status(201).end('Token created.');
    })

}
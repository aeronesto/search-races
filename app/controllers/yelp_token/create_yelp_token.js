var Token = require('../../models/yelp_token.js');

module.exports = function(token_data, cb) {

    var newToken = new Token({
        access_token: token_data.access_token,
        token_type: token_data.token_type,
        expireAt: (new Date().valueOf() + 30 * 24 * 60 * 60 * 1000) //expires in 30 days
    });

    newToken.save(function(err) {
        if(err) {
            cb(err);
        }
        cb();
    })

}
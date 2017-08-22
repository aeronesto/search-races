var Yelp_Token = require('../../models/yelp_token');

module.exports = function(req, res, cb, next) {

    var yelp_token = Yelp_Token.find({}).exec(function(err, token){
        if(err) {
            cb(err);
        }
        else {
            if(token.length === 0) {
                cb();
            } else {
                req.token = token[0].access_token;
                next();
            }
        }        
    });

};
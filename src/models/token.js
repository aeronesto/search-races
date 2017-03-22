var mongoose = require('mongoose');
//replace deprecated mpromise
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var db = mongoose.createConnection(process.env.MONGOLAB_URI);

var tokenSchema = new Schema({
    access_token: { type: String, required: true, unique: true },
    token_type: { type: String, require: true },
    expireAfterSeconds: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

tokenSchema.index({'createdAt':1,}, {'expireAfterSeconds': 5});

var Token = db.model('Token', tokenSchema, 'token');

module.exports = Token;
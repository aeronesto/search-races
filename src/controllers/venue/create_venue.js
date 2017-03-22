var Venue = require('../../models/venue.js');

module.exports = function(req, res) {

    console.log('IN CREATE VENUE');

    //expires tomorrow at 5:00:00 a.m.
    var d = new Date();         //current Date
    d.setDate(d.getDate() + 1)  //same time tomorrow
    d.setHours(5)               //5:XX:XX a.m.
    d.setMinutes(0)             //5:00:XX a.m.
    d.setSeconds(0)             //5:00:00 a.m.

    //var expDate = d;

    //expire in 1 minute to test
    var tempDate = new Date();
    tempDate.setMinutes(tempDate.getMinutes() + 1);

    var expDate = tempDate;

    var newVenue = new Venue({
        yelp_id: req.body.yelp_id,
        expirationDate: expDate
    });

    newVenue.save(function(err) {
        if(err) {
            console.log(err);
            res.status(304).end();
        }

        console.log('Venue created!');

        res.status(201).end('Venue created.');
    })

}
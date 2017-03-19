import express from 'express';
import logger from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

var app = express();

app.use(logger('tiny'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/favicon.ico', function(req, res) {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.post('/login', login);
app.post('/logout', logout);

app.use(check_token);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
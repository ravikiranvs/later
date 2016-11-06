var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var passport = require('passport')
var UserStore = require('../database/csv')

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'SECRETKEY' }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);

var redditAuth = require('./auth/reddit')

redditAuth(app, passport, {
    REDDIT_CONSUMER_KEY: 'username',
    REDDIT_CONSUMER_SECRET: 'password'
}, new UserStore())

app.get('/api', function(req, res) {
    res.send('Hello World!')
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})
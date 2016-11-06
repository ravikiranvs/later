const redditRoutes = function(app, passport) {
    app.get('/auth/reddit', function(req, res, next) {
        var crypto = require('crypto')
        var state = crypto.randomBytes(32).toString('hex');
        passport.authenticate('reddit', {
            state: state,
            duration: 'permanent',
        })(req, res, next);
    });

    app.get('/auth/reddit/callback', function(req, res, next) {
        // Check for origin via state token
        passport.authenticate('reddit', {
            successRedirect: '/',
            failureRedirect: '/login',
            session: true
        })(req, res, next);
    });
}

module.exports = redditRoutes
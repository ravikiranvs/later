const redditRoutes = function (app, passport) {
    app.get('/auth/reddit', function (req, res, next) {
        var crypto = require('crypto')
        req.session.state = crypto.randomBytes(32).toString('hex');
        passport.authenticate('reddit', {
            state: req.session.state,
            duration: 'permanent',
        })(req, res, next);
    });

    app.get('/auth/reddit/callback', function (req, res, next) {
        // Check for origin via state token
        if (req.query.state == req.session.state) {
            passport.authenticate('reddit', {
                successRedirect: '/',
                failureRedirect: '/login'
            })(req, res, next);
        }
        else {
            next(new Error(403));
        }
    });
}

module.exports = redditRoutes
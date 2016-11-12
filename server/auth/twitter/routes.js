const twitterRoutes = function(app, passport) {
    app.get('/auth/twitter', passport.authenticate('twitter'))

    app.get('/auth/twitter/callback', function(req, res, next) {
        passport.authenticate('reddit', {
            successRedirect: '/',
            failureRedirect: '/login',
            session: true
        })(req, res, next);
    })
}

module.exports = twitterRoutes
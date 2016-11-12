const imgurRoutes = function(app, passport) {
    app.get('/auth/imgur', passport.authenticate('imgur'))

    app.get('/auth/imgur/callback', function(req, res, next) {
        passport.authenticate('imgur', {
            successRedirect: '/',
            failureRedirect: '/login',
            session: true
        })(req, res, next);
    })
}

module.exports = imgurRoutes
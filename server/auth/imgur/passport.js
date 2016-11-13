const imgurPassport = function (passport, authConfig, userStore) {
    var ImgurStrategy  = require('passport-imgur').Strategy
    passport.use(new ImgurStrategy({
        clientID: authConfig.IMGUR_CONSUMER_KEY,
        clientSecret: authConfig.IMGUR_CONSUMER_SECRET,
        callbackURL: 'http://0.0.0.0:3000/auth/imgur/callback',
        passReqToCallback: true
    },
        function (req, accessToken, refreshToken, profile, done) {
            var user = {
                imgurId: profile.id,
                imgurAccessToken: accessToken,
                imgurRefreshToken: refreshToken
            }

            if(req.user){
                user = Object.assign({}, req.user, user)
            }
            userStore.findOrCreate(user, function (err, user) {
                return done(err, user)
            });
        }
    ));
}

module.exports = twitterPassport
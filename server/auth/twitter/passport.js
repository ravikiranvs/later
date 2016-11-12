const twitterPassport = function (passport, authConfig, userStore) {
    var TwitterStrategy  = require('passport-twitter').Strategy
    passport.use(new TwitterStrategy({
        clientID: authConfig.TWITTER_CONSUMER_KEY,
        clientSecret: authConfig.TWITTER_CONSUMER_SECRET,
        callbackURL: 'http://0.0.0.0:3000/auth/twitter/callback',
        passReqToCallback: true
    },
        function (req, accessToken, refreshToken, profile, done) {
            var user = {
                twitterId: profile.id,
                twitterAccessToken: accessToken,
                twitterRefreshToken: refreshToken
            }

            if(req.user){
                user = Object.assign({}, req.user, user)
            }
            userStore.findOrCreate(user, function (err, user) {
                return done(err, user);
            });
        }
    ));
}

module.exports = twitterPassport
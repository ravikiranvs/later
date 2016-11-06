const redditPassport = function (passport, authConfig, userStore) {
    var RedditStrategy = require('passport-reddit').Strategy
    passport.use(new RedditStrategy({
        clientID: authConfig.REDDIT_CONSUMER_KEY,
        clientSecret: authConfig.REDDIT_CONSUMER_SECRET,
        callbackURL: 'http://0.0.0.0:3000/auth/reddit/callback',
        passReqToCallback: true
    },
        function (req, accessToken, refreshToken, profile, done) {
            var user = {
                redditId: profile.id,
                redditAccessToken: accessToken,
                redditRefreshToken: refreshToken
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

module.exports = redditPassport
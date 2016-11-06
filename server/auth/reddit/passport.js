const redditPassport = function (passport, authConfig, userStore) {
    var RedditStrategy = require('passport-reddit').Strategy
    passport.use(new RedditStrategy({
        clientID: authConfig.REDDIT_CONSUMER_KEY,
        clientSecret: authConfig.REDDIT_CONSUMER_SECRET,
        callbackURL: "http://0.0.0.0:3000/auth/reddit/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            userStore.findOrCreate(profile, function (err, user) {
                return done(err, user);
            });
        }
    ));
}

module.exports = redditPassport
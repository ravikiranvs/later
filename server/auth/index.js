var passport = require('passport')
var DBCreator = require('../../database')

const setup = function(app) {
    app.use(passport.initialize())

    app.use(passport.session());

    var authConfig = {
        REDDIT_CONSUMER_KEY: 'goBGb_8I_vj33A',
        REDDIT_CONSUMER_SECRET: 'DT8pB9nidwZnJjsMA1vGBgUeNUU',
        TWITTER_CONSUMER_KEY: 'NnIrMi7HQ15ur4b1PGe5a9jtv',
        TWITTER_CONSUMER_SECRET: '8guyo7A0io2TUzejlIpih04ZYpw794KECwnZ7GnUiAU8DqopeF',
        IMGUR_CONSUMER_KEY: '437ffc187a00ff3',
        IMGUR_CONSUMER_SECRET: '4d3bb8d78f805d6c842741bf88c706cf4d21f351'
    }

    DBCreator('csv', 'users', (x, y) => {
        return x.redditId == y.redditId || x.twitterId == y.twitterId || x.imgurId == y.imgurId
    }, (err, userStore) => {
        if (err) console.error(err)
        else {
            require('./reddit')(app, passport, authConfig, userStore)
            require('./twitter')(app, passport, authConfig, userStore)
            require('./imgur')(app, passport, authConfig, userStore)

            passport.serializeUser(function(user, done) {
                done(null, JSON.stringify(user))
            })

            passport.deserializeUser(function(userJson, done) {
                var user = JSON.parse(userJson)
                userStore.find(user, function(err, user) {
                    done(err, user)
                })
            })
        }
    })
}

module.exports = setup
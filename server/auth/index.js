var passport = require('passport')
var UserStore = require('../../database/csv')

const setup = function (app) {
    app.use(passport.initialize())

    app.use(passport.session());

    var authConfig = {
        REDDIT_CONSUMER_KEY: 'goBGb_8I_vj33A',
        REDDIT_CONSUMER_SECRET: 'DT8pB9nidwZnJjsMA1vGBgUeNUU',
        TWITTER_CONSUMER_KEY: 'KEY',
        TWITTER_CONSUMER_SECRET: 'SECRET',
        IMGUR_CONSUMER_KEY: 'KEY',
        IMGUR_CONSUMER_SECRET: 'SECRET'
    }

    var userStore = new UserStore()

    require('./reddit')(app, passport, authConfig, userStore)
    require('./twitter')(app, passport, authConfig, userStore)
    require('./imgur')(app, passport, authConfig, userStore)

    passport.serializeUser(function (user, done) {
        done(null, user.redditId)
    })

    passport.deserializeUser(function (id, done) {
        userStore.find(id, function (err, user) {
            done(err, user)
        })
    });
}

module.exports = setup
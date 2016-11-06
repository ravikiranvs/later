var redditPassportSetup = require('./passport')
var redditRoutesSetup = require('./routes')

const setup = function (app, passport, authConfig, userStore) {
    redditPassportSetup(passport, authConfig, userStore)
    redditRoutesSetup(app, passport)
}

module.exports = setup
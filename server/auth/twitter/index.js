var twitterPassportSetup = require('./passport')
var twitterRoutesSetup = require('./routes')

const setup = function (app, passport, authConfig, userStore) {
    twitterPassportSetup(passport, authConfig, userStore)
    twitterRoutesSetup(app, passport)
}

module.exports = setup
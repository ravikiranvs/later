var imgurPassportSetup = require('./passport')
var imgurRoutesSetup = require('./routes')

const setup = function (app, passport, authConfig, userStore) {
    imgurPassportSetup(passport, authConfig, userStore)
    imgurRoutesSetup(app, passport)
}

module.exports = setup
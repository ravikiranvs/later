const setupGlobalMiddleware = function (app) {
    //app.use(require('./auth'))
}

module.exports = {
    setupGlobalMiddleware,
    isAuthenticated: require('./auth')
}
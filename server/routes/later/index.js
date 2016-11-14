const laterRoutes = function (app, middleware) {
    app.get('/api/later/reddit', middleware.isAuthenticated, function (req, res, next) {
        res.send([])
    })
}
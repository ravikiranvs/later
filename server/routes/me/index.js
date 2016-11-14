const meRoute = function (app, middlewares) {
    app.get('/api/me', middlewares.isAuthenticated, function (req, res, next) {ß
        res.send(req.user)
    })
}
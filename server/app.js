var express = require('express')
var app = express()
//var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

app.use(express.static('public'))
//app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(session({ 
    secret: 'SECRET',
    resave: false,
    saveUninitialized: false
 }))

var authInit = require('./auth')

authInit(app)

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})
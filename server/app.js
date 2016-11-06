var express = require('express')
var app = express()

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'SECRETKEY' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
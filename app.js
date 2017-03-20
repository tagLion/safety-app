var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var stormpath = require('express-stormpath');
var app = express();
var PORT = process.env.PORT || 3000
require('dotenv').config()
app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: process.env.APIID,
      secret: process.env.APISID,
    }
  },
  application: {
    href: process.env.APPURL
  },
  web: {
    login: {
      enabled: true,
      nextUri: "/test.html"
    }
  }
}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use((req, res, next)=> {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});


// app.on('stormpath.ready', function () {
//   app.listen(PORT, function () {
//     //...
//   });
// });
module.exports = app;
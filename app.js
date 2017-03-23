const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors =  require('cors')
var index = require('./routes/index');
var users = require('./routes/users');
var incidents = require('./routes/incidents')
var stormpath = require('express-stormpath');
var app = express();
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

require('dotenv').config()
var PORT = process.env.PORT || 3000

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

function ensureSecure(req, res, next){
  if(req.headers["x-forwarded-proto"] === "https"){
  // OK, continue
  return next();
  };
  res.redirect('https://'+req.hostname+req.url); // handle port numbers if you need non defaults
};
if (process.env.NODE_ENV != 'development'){
app.use('*', ensureSecure)
}
app.use(cors(corsOptions))
app.use(stormpath.init(app, {
  postLogoutHandler: function (account, req, res, next) {
    console.log('User', account.email, 'just logged out!');
    next()
  },
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
idSite: {
enabled: true,
uri: '/idSiteResult', // default setting
nextUri: 'http://getmesafe.herokuapp.com/'
},
logout: {
      enabled: true,
      uri: '/logout',
      nextUri: 'http://getmesafe.herokuapp.com/idSiteResult'
    }
}
}));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
app.use('/incidents', incidents);



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

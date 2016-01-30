var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var setting = require('./setting');

var routes = require('./routes/routes');

var app = express();

var sessionMaxAge = 365*24*60*60*1000;//milliseconds

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: setting.secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: sessionMaxAge
  },
  store: new MongoStore({
    mongooseConnection: mongoose.createConnection(setting.dbUrl),
    autoRemove: 'disabled',
    ttl: sessionMaxAge/1000
  })
}));

app.use('/', routes.index);
app.use('/api', routes.api);
app.use('/login', routes.login);
app.use('/admin', routes.admin);
app.use('/logout', routes.logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

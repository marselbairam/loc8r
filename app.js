require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var uglifyJs = require('uglify-js');
var fs = require('fs');
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

var indexRouter = require('./app_server/routes/index');
var indexApiRouter = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

var appClientFiles = {
  'app': fs.readFileSync('app_client/app.js', 'utf-8'),
  'home': fs.readFileSync('app_client/home/home.controller.js', 'utf-8'),
  'about': fs.readFileSync('app_client/about/about.controller.js' ,'utf-8'),
  'locationDetail': fs.readFileSync('app_client/locationDetail/locationDetail.controller.js', 'utf-8'),
  'reviewModal': fs.readFileSync('app_client/reviewModal/reviewModal.controller.js', 'utf-8'),
  'geolocation': fs.readFileSync('app_client/common/services/geolocation.service.js', 'utf-8'),
  'loc8rData': fs.readFileSync('app_client/common/services/loc8rData.service.js', 'utf-8'),
  'formatDistance': fs.readFileSync('app_client/common/filters/formatDistance.filter.js', 'utf-8'),
  'addHtmlLineBreaks': fs.readFileSync('app_client/common/filters/addHtmlLineBreaks.filter.js', 'utf-8'),
  'ratingStars': fs.readFileSync('app_client/common/directives/ratingStars/ratingStars.directive.js', 'utf-8'),
  'footerGeneric': fs.readFileSync('app_client/common/directives/footerGeneric/footerGeneric.directive.js', 'utf-8'),
  'navigation': fs.readFileSync('app_client/common/directives/navigation/navigation.directive.js', 'utf-8'),
  'pageHeader': fs.readFileSync('app_client/common/directives/pageHeader/pageHeader.directive.js', 'utf-8')
};

var uglified = uglifyJs.minify(appClientFiles, { compress: false });

fs.writeFile('public/angular/loc8r.min.js', uglified.code, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Script generated and saved: loc8r.min.js');
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());

// app.use('/', indexRouter);
app.use('/api', indexApiRouter);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

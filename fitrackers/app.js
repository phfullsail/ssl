var express = require('express')    
var app = express();
//var port = port.env.PORT || 3000;

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
 // , hash = require('./pass').hash;   
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//var configDB = require('./data.json');
//var configDB = require('./config/database.js');

// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration


var routes = require('./routes/index');
//var users = require('./routes/user






app.locals.pagetitle = "Fit Tracker";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/toprated', routes);
app.use('/alltrackers', routes);
app.use('/addtrackers', routes);
app.use('/ratetrackers', routes);
app.use('/reportissue', routes);
app.use('/about', routes);
app.use('/contact', routes);
app.use('/home', routes);
//app.use('/login', routes);
//app.use('/users', users);

app.get('/login', loginGet);

function loginGet(req, res){
  if(req.user){
    // already logged in
    res.redirect('/');
  } else {
    // not logged in, show the login form, remember to pass the message
    // for displaying when error happens
    res.render('/login', { message: req.session.messages });
    // and then remember to clear the message
    req.session.messages = null;
  }
}

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

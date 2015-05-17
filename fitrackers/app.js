var express = require('express')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
 // , hash = require('./pass').hash;   
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'trackers',
    charset  : 'utf8'
  },
  pool: {
    min: 0,
    max: 7
  }
});

var bookshelf = require('bookshelf')(knex);

var Users = bookshelf.Model.extend({
  tableName: 'users'
});

var users = Users;


var app = express();

app.locals.pagetitle = "Fit Tracker";
app.locals.users = users;
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
app.use('/login', routes);
//app.use('/users', users);

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

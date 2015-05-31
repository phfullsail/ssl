var flash = require('connect-flash'),
    express = require('express'),
    exphbs = require('express-handlebars'),    
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    hash = require('./pass').hash,
    http = require('http');
    user = require('./user');

    var newUser = {
      fname: 'horton-test-this-new-guy',
      lname: 'who',
      username: 'hwho',
      password: 'test',
      email: 'hwho@test.com'
    };

    var nu = user(newUser);

    console.log(nu.getInfo());

//var port = port.env.PORT || 3000;

//var mongoose = require('mongoose');

//var flash = require('connect-flash');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
 // , hash = require('./pass').hash;   
var path = require('path');
//var favicon = require('serve-favicon');
/*var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; */    

//var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('localhost:3000/data');

//var configDB = require('./data.json');
//var configDB = require('./config/database.js');

// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration
var app = express();


//app.use(logger('dev'));
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'keepsteppin', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());


// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});


/*passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(username, password, done) {
    // ...
    console.log('done');
  }
)); */

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main', //we will be creating this layout shortly
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
//var users = require('./routes/users');


app.locals.pagetitle = "Fit Tracker";
app.locals.appdata = require('./data.json');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ==============Routes=====================
app.use('/', routes);
//app.use('/users', routes);
app.use('/toprated', routes);
app.use('/alltrackers', routes);
app.use('/addtrackers', routes);
app.use('/ratetrackers', routes);
app.use('/reportissue', routes);
app.use('/about', routes);
app.use('/contact', routes);
app.use('/home', routes);
app.use('/login', routes);

app.get('/users'. routes);

//app.get('/users', routes.users);
//app.use('/users', users);

/*app.get('/login', loginGet);

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
}*/

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

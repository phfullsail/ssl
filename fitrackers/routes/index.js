var express = require('express');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var router = express.Router();
var appdata = require('../data.json');

  var user = [];
  var users = [];

  users = appdata.users;


 appdata.users.forEach(function(item) {
  user = user.concat(item.user);
  });


/*passport.use(new LocalStrategy(
  function(username, password, done) {
    user.findOne({ username: username }, function(err, user) {
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
));*/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Fit Tracker Optimizer',
  	classname: 'index' });
});

router.get('/forgot', function(req, res, next) {
  res.render('forgot', { 
  	title: 'Fit Tracker Optimizer Forgot Password',
  	classname: 'forgot' });
});

router.get('/login', function(req, res, next) {
 /*var user = [];
  var users = [];

 users = appdata.users;


appdata.users.forEach(function(item) {
   user = user.concat(item.user);
  });*/

  res.render('login', { 
  	title: 'Fit Tracker Optimizer Sign In',
  	classname: 'login',
    message: req.flash('loginMessage')});
});

/*passport.authenticate('local', { failureFlash: 'Invalid username or password.' });

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: 'Invalid username or password.',
                                   successFlash: 'Welcome!'  })
);*/

router.get('/signup', function(req, res, next) {
  res.render('signup', { 
    title: 'Fit Tracker Optimizer Sign Up',
    classname: 'signup',
    message: req.flash('signupMessage') });
});

router.get('/home', isLoggedIn, function(req, res, next) {
  res.render('home', { 
  	title: 'Fit Tracker Optimizer',
  	classname: 'home'});
});

router.get('/toprated', function(req, res, next) {
  res.render('toprated', { 
  	title: 'Fit Tracker Top Rated',
  	classname: 'toprated' });
});

router.get('/alltrackers', function(req, res, next) {
  res.render('alltrackers', { 
  	title: 'Fit Tracker All Trackers',
  	classname: 'alltrackers' });
});

router.get('/addtrackers', function(req, res, next) {
  res.render('add', { 
  	title: 'Fit Tracker Add Trackers',
  	classname: 'addtrackers' });
});

router.get('/ratetrackers', function(req, res, next) {
  res.render('rate', { 
  	title: 'Fit Tracker Rate Trackers',
  	classname: 'ratetrackers' });
});

router.get('/reportissue', function(req, res, next) {
  res.render('reportissue', { 
  	title: 'Fit Tracker Report Issue',
  	classname: 'reportissue' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { 
  	title: 'Fit Tracker About Us',
  	classname: 'about' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { 
  	title: 'Fit Tracker Contact Us',
  	classname: 'contact' });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;

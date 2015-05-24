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
  var featured = appdata.featured[0].name;
  var imageMain = "/images/" + appdata.featured[0].images[1];
  var imageSecondary = "/images/" + appdata.featured[0].images[2];
  var featuredDesc = appdata.featured[0].description;
  var featuredDesc2 = appdata.featured[0].additional;
  var source = appdata.featured[0].source;
  
  res.render('index', { 
  	title: 'Fit Tracker Optimizer',
  	classname: 'index',
    device: featured,
    imageMain: imageMain,
    imageSecondary: imageSecondary,
    description: featuredDesc,
    description2: featuredDesc2,
    source: source  });
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
  	classname: 'login'});
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

/*router.get('/home', isLoggedIn, function(req, res, next) {

  res.render('home', { 
  	title: 'Fit Tracker Optimizer',
  	classname: 'home'});
});*/

router.get('/home', function(req, res, next) {
    var featured = appdata.featured[0].name;
    var imageMain = "/images/" + appdata.featured[0].images[1];
    var imageSecondary = "/images/" + appdata.featured[0].images[2];
    var featuredDesc = appdata.featured[0].description;
    var featuredDesc2 = appdata.featured[0].additional;
    var source = appdata.featured[0].source;
  res.render('home', { 
    title: 'Fit Tracker Optimizer',
    classname: 'home',
    device: featured,
    imageMain: imageMain,
    imageSecondary: imageSecondary,
    description: featuredDesc,
    description2: featuredDesc2,
    source: source});
});

router.get('/toprated', function(req, res, next) {
  res.render('toprated', { 
  	title: 'Fit Tracker Top Rated',
  	classname: 'toprated' });
});


router.get('/alltrackers', function(req, res, next) {
   var device = [];
  var devices = [];

  users = appdata.devices;


 appdata.devices.forEach(function(item) {
  device = device.concat(item.device);
  });

  res.render('alltrackers', { 
  	title: 'Fit Tracker All Trackers',
  	classname: 'alltrackers',
    devices: devices,
    device: device });
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

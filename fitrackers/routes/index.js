var express = require('express');
var router = express.Router();

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
  res.render('login', { 
  	title: 'Fit Tracker Optimizer Sign In',
  	classname: 'login' });
});

// process the login form
/*router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }),
    function(req, res) {
        console.log("hello");

        if (req.body.remember) {
          req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
          req.session.cookie.expires = false;
        }
    res.redirect('/');
});*/

router.get('/signup', function(req, res, next) {
  res.render('signup', { 
    title: 'Fit Tracker Optimizer Sign Up',
    classname: 'signup' });
});

router.get('/home', function(req, res, next) {
  res.render('home', { 
  	title: 'Fit Tracker Optimizer',
  	classname: 'home'});
});

router.get('/toprated', function(req, res, next) {
  res.render('toprated', { 
  	title: 'Top Rated Trackers',
  	classname: 'toprated' });
});

router.get('/alltrackers', function(req, res, next) {
  res.render('alltrackers', { 
  	title: 'All Trackers',
  	classname: 'alltrackers' });
});

router.get('/addtrackers', function(req, res, next) {
  res.render('add', { 
  	title: 'Add Trackers',
  	classname: 'addtrackers' });
});

router.get('/ratetrackers', function(req, res, next) {
  res.render('rate', { 
  	title: 'Rate Trackers',
  	classname: 'ratetrackers' });
});

router.get('/reportissue', function(req, res, next) {
  res.render('reportissue', { 
  	title: 'Report Issue',
  	classname: 'reportissue' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { 
  	title: 'About Us',
  	classname: 'about' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { 
  	title: 'Contact Us',
  	classname: 'contact' });
});

module.exports = router;

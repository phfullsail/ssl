var flash = require('connect-flash');
var express = require('express');
var passport = require('passport');
var util = require('util');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var http = require('http');
var jf = require('jsonfile');
//var file = '/tmp/data.json';

var router = express.Router();
var appdata = require('../data.json');

var user = require('../user'); 


 // var user = [];
  var users = [];

  users = appdata.users;


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log('here');
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));



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


router.user = function(req, res) {
  var user = require('../user'); 


  var dataUser = user;
  var users = [];

  users = appdata.users;
console.log('users ---- ', users);
appdata.users.forEach(function(item) {
  dataUser = dataUser.concat(item.user);
  res.json(dataUser.getInfo());
  });

};

router.get('/login', function(req, res){
  res.render('login', { 
    user: req.user,
    message: '', 
    title: 'Fit Tracker Optimizer Sign In',
    classname: 'login' ,
    showclass: 'hide-error'});
});



router.post('/login', function (req, res) {
  var post = req.body;
  var user = [];
  var users = [];

  users = appdata.users;
  users.forEach(function(item) {
  user = user.concat(item.user);
 

    if (post.username ===  item.username && post.password === item.password) {
      req.session.user_id = item.username;
      res.redirect('/home');
    } else {
   res.message = "Invalid";
    req.session.error = 'Authentication failed, please check your ' ;
   res.redirect('/login'); 
    }
   });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { 
    title: 'Fit Tracker Optimizer Sign Up',
    classname: 'signup'});
});

router.get('/home', function(req, res, next) {
  sess=req.session;
  if (req.session.user_id){
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
    } else {
       res.render('login', { 
        user: req.user,
        message: '', 
        title: 'Fit Tracker Optimizer Sign In',
        classname: 'login' ,
        showclass: 'hide-error'});

      }
});

router.get('/toprated', function(req, res, next) {
   sess=req.session;
   if (req.session.user_id){
   var device = [];
  var devices = [];

  devices = appdata.top;


 appdata.top.forEach(function(item) {
  device = device.concat(item.device);
  });

  res.render('toprated', { 
  	title: 'Fit Tracker Top Rated',
  	classname: 'toprated',
    devices: devices,
    device: device });

  } else {
    res.render('login', { 
    user: req.user,
    message: '', 
    title: 'Fit Tracker Optimizer Sign In',
    classname: 'login' ,
    showclass: 'hide-error'});
  }
});


router.get('/alltrackers', function(req, res, next) {
   sess=req.session;
   if (req.session.user_id){
    var device = [];
    var devices = [];

    devices = appdata.devices;


 appdata.devices.forEach(function(item) {
  device = device.concat(item.device);
  });

  res.render('alltrackers', { 
  	title: 'Fit Tracker All Trackers',
  	classname: 'alltrackers',
    devices: devices,
    device: device });
    }else {
      res.render('login', { 
    user: req.user,
    message: '', 
    title: 'Fit Tracker Optimizer Sign In',
    classname: 'login' ,
    showclass: 'hide-error'});
    }
});

router.get('/addtrackers', function(req, res, next) {
   sess=req.session;
   if (req.session.user_id){
  res.render('add', { 
  	title: 'Fit Tracker Add Trackers',
  	classname: 'addtrackers' });
    } else {
     res.render('login', { 
    user: req.user,
    message: '', 
    title: 'Fit Tracker Optimizer Sign In',
    classname: 'login' ,
    showclass: 'hide-error'});
    }
});

router.get('/ratetrackers', function(req, res, next) {
   sess=req.session;
   if (req.session.user_id){
     var device = [];
    var devices = [];

    devices = appdata.devices;


 appdata.devices.forEach(function(item) {
  device = device.concat(item.device);
  });
  res.render('rate', { 
  	title: 'Fit Tracker Rate Trackers',
  	classname: 'ratetrackers',
    devices: devices,
    device: device });
    } else {
      res.render('login', { 
    user: req.user,
    message: '', 
    title: 'Fit Tracker Optimizer Sign In',
    classname: 'login' ,
    showclass: 'hide-error'});
    }
});

router.get('/reportissue', function(req, res, next) {
   sess=req.session;
   if (req.session.user_id){
  res.render('reportissue', { 
  	title: 'Fit Tracker Report Issue',
  	classname: 'reportissue' });
    } else {
      res.render('login', { 
    user: req.user,
    message: '', 
    title: 'Fit Tracker Optimizer Sign In',
    classname: 'login' ,
    showclass: 'hide-error'});
    }
});

router.get('/about', function(req, res, next) {
  res.render('about', { 
  	title: 'Fit Tracker About Us',
  	classname: 'about' });
});

router.get('/contact', function(req, res, next) {
   sess=req.session;
   if (req.session.user_id){
  res.render('contact', { 
  	title: 'Fit Tracker Contact Us',
  	classname: 'contact' });
    } else {
      res.render('login', { 
    user: req.user,
    message: '', 
    title: 'Fit Tracker Optimizer Sign In',
    classname: 'login' ,
    showclass: 'hide-error'});
    }
});


module.exports = router;


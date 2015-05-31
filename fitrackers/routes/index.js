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


 /*appdata.users.forEach(function(item) {
  user = user.concat(item.user);
  });*/

 /*function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}*/


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log('here');
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
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

/*router.get('/user', function(req, res, next) {
  appdata.users.forEach(function(item) {
  user = user.concat(item.user);
  res.json(user.getInfo());
  });
  
});*/

/*router.user = function(req, res) {
  var user = require('../user'); 


  var user = [];
  var users = [];

  users = appdata.users;


  for(var i =0;i<users.length;i++){
   res.json(users[i].getInfo());
  }  
 
};*/

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

// for(var i =0;i<users.length;i++){
 //  res.json(users[i].getInfo());
 // };  
};

router.get('/login', function(req, res){
  res.render('login', { 
    user: req.user,
    message: '', 
    title: 'Fit Tracker Optimizer Sign In',
    classname: 'login' ,
    showclass: 'hide-error'});
});


/// this one works
router.post('/login', function (req, res) {
  var post = req.body;
  var user = [];
  var users = [];

  users = appdata.users;
  users.forEach(function(item) {
  user = user.concat(item.user);
 // console.warn('user',item.username);

    if (post.username ===  item.username && post.password === item.password) {
      req.session.user_id = item.username;
      res.redirect('/home');
    } else {
     // res.redirect('/login');
     console.log('data', post.username + ' - name  password - ' + post.password);
   //  req.session.user_id = '';
   //res.data = 'error';
   //res.end("yes");
   res.message = "Invalid";
 req.session.error = 'Authentication failed, please check your ' ;
  // res.redirect('back');
   res.redirect('/login'); 
    }
   });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { 
    title: 'Fit Tracker Optimizer Sign Up',
    classname: 'signup'});
});

/*router.put('/signup/add', function(req, res, next) {
  res.render('signup', { 
    title: 'Fit Tracker Optimizer Sign Up',
    classname: 'signup'});
});*/

/*router.post('/signup', function(req, res) {
    var db = appdata.users;
    var post = req.body;
    var user = {
      fname: post.fname,
      lname: post.lname,
      username: post.username,
      password: post.password,
      email: post.email
    };
    var userString = JSON.stringify(user);
    res.header("Access-Control-Allow-Origin", "*");
    res.send("OK");
    jf.writeFile(users, userString, function(err) {
 // console.log(err)
})*/
    
/*    db.insert(userString, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });*/
//});

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

/*request({
    url: 'https://modulus.io/contact/demo', //URL to hit
    qs: {from: 'blog example', time: +new Date()}, //Query string data
    method: 'POST',
    //Lets post the following key/values as form
    form: {
        field1: 'data',
        field2: 'data'
    }
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});*/

module.exports = router;


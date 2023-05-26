"use strict";

// importing modules
var express = require('express');

var path = require('path');

var Db = require('./db');

var userDb = require('./userDb');

var passport = require('passport');

var bcrypt = require('bcrypt');

var session = require('express-session');

var flash = require('express-flash');

var passportInit = require('./passport-config'); // creating app


var app = express();
var port = 80;
app.use('/static', express["static"]('static'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
})); // pug config

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // session config

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash()); // passport config

passportInit(passport);
app.use(passport.initialize());
app.use(passport.session()); // get endpoints

app.get('/', function (req, res) {
  var params = {
    'pageName': 'Home'
  };
  res.status(200).render('index.pug', params);
});
app.get('/about', function (req, res) {
  var params = {
    'pageName': 'About'
  };
  res.status(200).render('about.pug', params);
});
app.get('/contact', function (req, res) {
  var params = {
    'pageName': 'Contact Us'
  };
  res.status(200).render('contact.pug', params);
});
app.get('/services', function (req, res) {
  var params = {
    'pageName': 'Services'
  };
  res.status(200).render('services.pug', params);
});
app.get('/classes', function (req, res) {
  var params = {
    'pageName': 'Classes We Provide'
  };
  res.status(200).render('classes.pug', params);
});
var i = 0;
app.get('/login', function _callee(req, res) {
  var obj, test, params;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(req.flash('error'));

        case 2:
          obj = _context.sent;
          test = i.toString();
          i++;
          params = {
            'pageName': 'Log in to your account',
            'messages': test
          };
          console.log('flash: ', obj);
          res.status(200).render('login', params);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));
app.post('/register', function _callee2(req, res) {
  var _req$body, name, email, username, password, user, hashedPassword;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log(req.body);
          _req$body = req.body, name = _req$body.name, email = _req$body.email, username = _req$body.username, password = _req$body.password;
          _context2.next = 5;
          return regeneratorRuntime.awrap(userDb.findOne({
            $or: [{
              username: username
            }, {
              email: email
            }]
          }).exec());

        case 5:
          user = _context2.sent;

          if (!user) {
            _context2.next = 11;
            break;
          }

          console.log('User exists');
          res.json({
            success: false
          });
          _context2.next = 16;
          break;

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 13:
          hashedPassword = _context2.sent;
          userDb.insertMany({
            name: name,
            email: email,
            username: username,
            password: hashedPassword
          });
          res.json({
            success: true
          });

        case 16:
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          console.log('Error in post register');

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
app.get('/register', function (req, res) {
  var params = {
    'pageName': 'Register new account'
  };
  res.status(200).render('register', params);
}); // post endpoints

app.post('/contact', function (req, res) {
  var data = req.body;
  console.log('reqbody: ', data);
  var db = Db.getSingleInstance();
  var result = db.createContact(data);
  result.then(function (data) {
    console.log(data);
    res.json({
      data: data
    });
  })["catch"](function (err) {
    console.log('Error in post contact'); // console.log(err);
  });
}); // starting server

app.listen(port, function () {
  console.log("The app is running at http://127.0.0.1/");
});
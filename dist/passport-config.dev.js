"use strict";

var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt');

var users = require('./userDb');

function initializePassport(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function _callee(username, password, done) {
    var user;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(users.findOne({
              username: username
            }).exec());

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", done(null, false, {
              message: 'User does not exist'
            }));

          case 6:
            bcrypt.compare(password, user.password).then(function (match) {
              // console.log(match);
              if (match) {
                return done(null, user);
              } else {
                return done(null, false, {
                  message: 'Incorrect Password'
                });
              }
            })["catch"](function (e) {
              return done(e);
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            done(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 9]]);
  }));
  passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user._id); // Assuming user object has a field named '_id'
  });
  passport.deserializeUser(function _callee2(id, done) {
    var user;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(users.findOne({
              _id: id
            }).exec());

          case 3:
            user = _context2.sent;

            if (user) {
              done(null, user);
            } else {
              done(null, false);
            }

            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            done(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
}

module.exports = initializePassport;
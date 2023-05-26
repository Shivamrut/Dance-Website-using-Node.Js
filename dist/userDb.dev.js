"use strict";

var mongoose = require('mongoose');

main().then(function (res) {
  console.log('userDb is connected'); // console.log(res);
})["catch"](function (err) {
  return console.log(err);
});

function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect('mongodb://127.0.0.1:27017/contactDance'));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String
});
var user = mongoose.model('danceUser', UserSchema);
module.exports = user;
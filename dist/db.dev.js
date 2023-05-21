"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mongoose = require('mongoose');

var instance = null;
main().then(function (res) {
  console.log('Db is connected'); // console.log(res);
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

var contact = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  address: String,
  concern: String
});
var Contact = mongoose.model('Contact', contact); // const item = new Contact({
//     name:'red',
//     phone:57,
//     email:'red.com',
//     address:'underworld',
//     concern: 'hacker'
// });
// item.save();

var Db =
/*#__PURE__*/
function () {
  function Db() {
    _classCallCheck(this, Db);
  }

  _createClass(Db, [{
    key: "createContact",
    value: function createContact(data) {
      var response;
      return regeneratorRuntime.async(function createContact$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                var item = new Contact(data);
                item.save().then(function (data) {
                  resolve({
                    success: true,
                    data: data
                  });
                })["catch"](function (err) {
                  reject(new Error(err.message));
                });
              }));

            case 3:
              response = _context2.sent;
              return _context2.abrupt("return", response);

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.log('Error in createContact db.js'); // console.log(err);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }], [{
    key: "getSingleInstance",
    value: function getSingleInstance() {
      return instance ? instance : new Db();
    }
  }]);

  return Db;
}();

module.exports = Db;
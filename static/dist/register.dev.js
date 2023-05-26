"use strict";

var btn = document.getElementById('registerBtn');
var form = document.getElementById('loginContainer');
var name = document.getElementById('name');
var password = document.getElementById('password');
var username = document.getElementById('username');
var email = document.getElementById('email');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('clicked');
  var registerInfo = {
    name: name.value,
    email: email.value,
    username: username.value,
    password: password.value
  };
  console.log(registerInfo);
  fetch('http://127.0.0.1/register', {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(registerInfo)
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
    location.reload();
  })["catch"](function (err) {
    console.log('Error in register submit');
  });
});
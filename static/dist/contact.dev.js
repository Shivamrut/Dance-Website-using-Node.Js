"use strict";

var btn = document.getElementById('submitContact');
var name = document.querySelector('input[name="name"]');
var phone = document.querySelector('input[name="phone"]');
var email = document.querySelector('input[name="email"]');
var address = document.querySelector('input[name="address"]');
var concern = document.querySelector('input[name="desc"]');
name.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    phone.focus();
  }
});
phone.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    email.focus();
  }
});
email.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    address.focus();
  }
});
address.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    concern.focus();
  }
});
btn.addEventListener('click', function (event) {
  var data = JSON.stringify({
    name: name.value,
    phone: phone.value,
    email: email.value,
    address: address.value,
    concern: concern.value
  }); // console.log('click: ',data);

  event.preventDefault();
  fetch('http://127.0.0.1/contact', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.data.success) {
      location.reload();
    }
  })["catch"](function (err) {
    console.log('Error in submitting'); // console.log(err);
  });
});
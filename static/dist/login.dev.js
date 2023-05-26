"use strict";

var btn = document.getElementById('loginBtn');
var name = document.getElementById('name');
var form = document.getElementById('loginContainer');
var key = document.getElementById('key');
form.addEventListener('submit', function (event) {
  // event.preventDefault();
  console.log('clicked'); // const loginInfo = {
  //     username: name.value,
  //     password: key.value
  // }
  // console.log(loginInfo);
  // fetch('http://127.0.0.1/login',{
  //     method:"POST",
  //     headers:{'Content-type':'application/json'},
  //     body: JSON.stringify( loginInfo)
  // })
  // .then(res=>{
  //     window.location=res.url;
  // })
});
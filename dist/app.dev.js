"use strict";

// importing modules
var express = require('express');

var path = require('path'); // creating app


var app = express();
var port = 80;
app.use('/static', express["static"]('static'));
app.use(express.urlencoded()); // pug config

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // get endpoints

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
}); // post endpoints

app.post('/contact', function (req, res) {
  var params = {
    'pageName': 'Contact Us'
  };
  res.status(200).render('contact.pug', params);
}); // starting server

app.listen(port, function () {
  console.log("The app is running at http://127.0.0.1/");
});
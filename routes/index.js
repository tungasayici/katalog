var express = require('express');
var request = require('request');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});

/* GET sign up page. */
router.get('/signup', function (req, res, next) {
  res.render('signup', {
    title: 'Signup'
  });
});

/* GET lockscreen page. */
router.get('/lockscreen', function (req, res, next) {
  res.render('lockscreen', {
    title: 'Lockscreen'
  });
});

/* GET lockscreen page. */
router.get('/forgotpassword', function (req, res, next) {
  res.render('forgotpassword', {
    title: 'Forgot Password'
  });
});

/* GET home page. */
router.get('/home', function (req, res, next) {
  // Set the headers
  var headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjgyNDI5MzksInVzZXJfbmFtZSI6Inlha3VwYWQiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNjIwM2NjMTAtMjRjZC00MjM0LTlmZDYtNDNkODc2NDFlYWU4IiwiY2xpZW50X2lkIjoiZnVuZG9vcGF5Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.etDDdgNh9l6REw4DbStU60Dy4MpJKV0j1Vh5OPFL5Cc'
  }
  // Configure the request
  var options = {
    url: 'https://katalog-backend.herokuapp.com/startup/all',
    method: 'GET',
    headers: headers,
    qs: {
      
    }
  }
  // Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      res.render('home', {
        data:  JSON.parse(body),
        title: 'Home'
      });
    }
  })
});

/* GET add page. */
router.get('/add', function (req, res, next) {
  res.render('add', {
    title: 'Add'
  });
});

/* GET detail page. */
router.get('/detail', function (req, res, next) {
  res.render('detail', {
    title: 'Detail'
  });
});

/* GET profile page. */
router.get('/profile', function (req, res, next) {
  res.render('profile', {
    title: 'Profile'
  });
});

module.exports = router;
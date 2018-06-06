var express = require('express');
var router = express.Router();
var request = require('request');
var helper = require('../utils/helper');
<<<<<<< HEAD

var email = "";
var password = "";

/* GET users listing. */
router.get('/getToken', function (req, res, next) {
  helper.tokenControl(email, password, function (response) {
    res.send(response);
  });
});

/* GET login page. */
router.post('/auth', function (req, res, next) {
  var headers = {
    'Content-Type': 'application/json'
  }
  var options = {
    url: 'https://katalog-backend.herokuapp.com/login',
    method: 'POST',
    headers: headers,
    json: true,
    body: {
      'email': req.body.email,
      'password': req.body.password
    }
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      global.authProfile = body;
      email = req.body.email;
      password = req.body.password;
      res.send(body);
    } else {
      res.send(error);
    }
  })
});

/* Get signup page */
router.post('/signup', function (req, res, next) {
  var headers = {
    'Content-Type': 'application/json'
  }
  var options = {
    url: 'https://katalog-backend.herokuapp.com/consumer/register',
    method: 'POST',
    headers: headers,
    json: true,
    body: {
      'username': req.body.username,
      'password': req.body.password,
      'email': req.body.email,
      'jobTitle': req.body.jobTitle,
      'profileImageUrl': req.body.profileImageUrl,
      'companyName': req.body.companyName,
      'fullName': req.body.fullName
    }
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      res.send(error);
    }
  })
});

=======

/* GET users listing. */
router.get('/getToken', function (req, res, next) {
  helper.tokenControl(AUTHEMAIL, AUTHPASSWORD, function (response) {
    res.send(response);
  });
});

/* GET login page. */
router.post('/auth', function (req, res, next) {
  var headers = {
    'Content-Type': 'application/json'
  }
  var options = {
    url: 'https://katalog-backend.herokuapp.com/login',
    method: 'POST',
    headers: headers,
    json: true,
    body: {
      'email': req.body.email,
      'password': req.body.password
    }
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      global.authProfile = body;
      global.AUTHEMAIL = req.body.email;
      global.AUTHPASSWORD = req.body.password;
      res.send(body);
    }else{
      res.send(error);
    }
  })
});

>>>>>>> 5281d9b78cbd294fa04caa8ab6ee5fe3cd037a0f
module.exports = router;
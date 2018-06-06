var express = require('express');
var router = express.Router();
var request = require('request');
var helper = require('../utils/helper');
var constants = require('../utils/constants');


router.get('/getStartupLogs/:id', function (req, res, next) {
  helper.tokenControl(AUTHEMAIL, AUTHPASSWORD, function (response) {

    var headers = {
      'Authorization': response
    }

    var options = {
      url: constants.URL + '/startup-log/all/' + req.params.id,
      method: 'GET',
      headers: headers
    }

    request(options, function (error, result, body) {
      if (!error && result.statusCode == 200) {
        res.send(result);
      }
    })
  });
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
    } else {
      res.send(error);
    }
  });
});
module.exports = router;


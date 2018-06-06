var express = require('express');
var router = express.Router();
var request = require('request');
var helper = require('../utils/helper');

/* GET users listing. */
router.get('/getToken', function (req, res, next) {
  helper.tokenControl(AUTHEMAIL, AUTHPASSWORD, function (response) {
    res.send(response);
  });
});

/* Login authentication */
router.post('/auth', function (req, res, next) {
  var headers = {
    'Content-Type': 'application/json'
  }
  var options = {
    url: 'https://katalog-backend.herokuapp.com/login',
    method: 'POST',
    headers: headers,
    json: true,
    body: req.body
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      global.authProfile = body;
      global.AUTHEMAIL = req.body.email;
      global.AUTHPASSWORD = req.body.password;
      res.send(body);
    }else{
      res.send(error);
    }
  })
});

/* Login authentication */
router.post('/addStartup', function (req, res, next) {
  helper.tokenControl(AUTHEMAIL, AUTHPASSWORD, function (token) {
    console.log(token)
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    var options = {
      url: 'https://katalog-backend.herokuapp.com/startup/create',
      method: 'POST',
      headers: headers,
      json: true,
      body: req.body
    }
  console.log(options);
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }else{
        res.send(error);
      }
    })
  });
});

module.exports = router;
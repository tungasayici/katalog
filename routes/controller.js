var express = require('express');
var router = express.Router();
var request = require('request');
var helper = require('../utils/helper');

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
    }else{
      res.send(error);
    }
  })
});


module.exports = router;
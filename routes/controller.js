var express = require('express');
var localStorage = require('localStorage')
var router = express.Router();
var request = require('request');
var helper = require('../utils/helper');
var constants = require('../utils/constants');

var AUTH = {}

/* Note page */
router.get('/getStartupLogs/:id', function (req, res, next) {
  helper.tokenControl(AUTH.AUTHEMAIL, AUTH.AUTHPASSWORD, function (response) {

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

/* Create Note */
router.post('/createLog/:id', function (req, res, next) {
  helper.tokenControl(AUTH.AUTHEMAIL, AUTH.AUTHPASSWORD, function (response) {
    var headers = {
      'Authorization': response
    }

    var options = {
      url: constants.URL + '/startup-log/create/' + req.params.id,
      method: 'POST',
      headers: headers,
      json: true,
      body: {
        'content': req.body.content
      }
    }
    request(options, function (error, result, body) {
      if (!error && result.statusCode == 200) {
        res.send(result);
      } else {
        res.send({ errorCode: 401 });
      }
    })
  });
});

/* Create Comment */
router.post('/createComment/:id', function (req, res, next) {
  helper.tokenControl(AUTH.AUTHEMAIL, AUTH.AUTHPASSWORD, function (response) {
    var headers = {
      'Authorization': response,
      'Content-Type' : "application/json"
    }

    var options = {
      url: constants.URL + '/commentReview/createComment/' + req.params.id,
      method: 'POST',
      headers: headers,
      json: true,
      body: {
        'content': req.body.content
      }
    }
    request(options, function (error, result, body) {
      if (!error && result.statusCode == 200) {
        res.send(body);
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
    body: req.body
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      var AUTHDATA = {
        "AUTHPROFILE" : body,
        "AUTHEMAIL" : req.body.email,
        "AUTHPASSWORD" : req.body.password
      }
      localStorage.setItem('AUTH', JSON.stringify(AUTHDATA));
      
      AUTH = JSON.parse(localStorage.getItem('AUTH'));
      console.log(AUTH);
      res.send(body);
    } else {
      res.send(error);
    }
  });
});

/* Add Startup */
router.post('/addStartup', function (req, res, next) {
  helper.tokenControl(AUTH.AUTHEMAIL, AUTH.AUTHPASSWORD, function (token) {
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
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      } else {
        res.send(error);
      }
    })
  });
});

router.get('/getTags', function (req, res, next) {
  helper.tokenControl(AUTH.AUTHEMAIL, AUTH.AUTHPASSWORD, function (token) {
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    var options = {
      url: 'https://katalog-backend.herokuapp.com/search/tag?like=',
      method: 'GET',
      headers: headers
    }
    
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      } else {
        res.send(error);
      }
    })
  });
});

module.exports = router;
var express = require('express');
var request = require('request');
var localStorage = require('localStorage')
var router = express.Router();
var helper = require('../utils/helper');
var constants = require('../utils/constants');

/* GET login page. */
router.get('/', function (req, res, next) {
  localStorage.setItem('AUTH', undefined);
  res.render('login', {
    title: 'Login'
  });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  localStorage.setItem('AUTH', undefined);
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
  var AUTH = JSON.parse(localStorage.getItem('AUTH'));
  helper.tokenControl(AUTH.AUTHEMAIL, AUTH.AUTHPASSWORD, function (response) {
    res.render('lockscreen', {
      title: 'Lockscreen',
      authProfile : AUTH.AUTHPROFILE,
    });
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
  var AUTH = JSON.parse(localStorage.getItem('AUTH'));
  
  helper.tokenControl(AUTH.AUTHEMAIL, AUTH.AUTHPASSWORD, function (response) {
    // Set the headers
    var headers = {
      'Authorization': response
    }
    // Configure the request
    var options = {
      url: constants.URL + '/startup/all',
      method: 'GET',
      headers: headers,
      qs: {

      }
    }
    console.log(response);
    // Start the request
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.render('home', {
          data: JSON.parse(body),
          authProfile : AUTH.AUTHPROFILE,
          title: 'Home'
        });
      }
    })
  });
});

/* GET add page. */
router.get('/add', function (req, res, next) {
  var AUTH = JSON.parse(localStorage.getItem('AUTH'));
  helper.tokenControl(AUTH.AUTHEMAIL, AUTH.AUTHPASSWORD, function (response) {
    res.render('add', {
      title: 'Add',
      authProfile : AUTH.AUTHPROFILE,
    });
  });
});

/* GET detail page. */
router.get('/detail/:id', function (req, res, next) {
  var AUTH = JSON.parse(localStorage.getItem('AUTH'));
  helper.tokenControl(AUTH.AUTHEMAIL, AUTH.AUTHPASSWORD, function (response) {
    var headers = {
      'Authorization': response
    }

    var options = {
      url: constants.URL + '/startup/' + req.params.id,
      method: 'GET',
      headers: headers
    }

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.render('detail', {
          data: JSON.parse(body),
          title: 'Detail',
          authProfile : AUTH.AUTHPROFILE,
        });
      }
    })
  })
});

/* GET update page. */
router.get('/update/:id', function (req, res, next) {
  var AUTH = JSON.parse(localStorage.getItem('AUTH'));
  helper.tokenControl(AUTH.AUTHEMAIL, AUTH.AUTHPASSWORD, function (response) {
    var headers = {
      'Authorization': response
    }

    var options = {
      url: constants.URL + '/startup/' + req.params.id,
      method: 'GET',
      headers: headers
    }

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        var values = [];
        for(var i=0; i < data.tags.length; i++){
          values.push(data.tags[i].name);
        }
        res.render('update', {
          data: data,
          values: values.join(),
          title: 'Update',
          authProfile : AUTH.AUTHPROFILE,
        });
      }
    })
  })
});

/* GET profile page. */
router.get('/profile', function (req, res, next) {
  var AUTH = JSON.parse(localStorage.getItem('AUTH'));
  helper.tokenControl(AUTH.AUTHEMAIL, AUTH.AUTHPASSWORD, function (response) {
    res.render('profile', {
      title: 'Profile',
      authProfile : AUTH.AUTHPROFILE,
    });
  });
});

module.exports = router;
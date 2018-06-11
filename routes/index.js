var express = require('express');
var request = require('request');
var localStorage = require('localStorage')
var router = express.Router();
var helper = require('../utils/helper');
var constants = require('../utils/constants');
var passportLinkedin = require('../services/authLinkedin');

function sessionCheck(req, res, next) {
  if (!req.session.AUTHPROFILE) {
    res.redirect('../login');
    res.end();
  } else {
    next
  }
}

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

/* AUTH Linkedin. */
router.get('/auth/linkedin',
passportLinkedin.authenticate('linkedin'));

router.get('/auth/linkedin/callback', 
passportLinkedin.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(res.body)
    res.redirect('/home');
  });

/* GET lockscreen page. */
router.get('/lockscreen', function (req, res, next) {
  sessionCheck(req, res, next);
  helper.tokenControl(req, function (response) {
    res.render('lockscreen', {
      title: 'Lockscreen',
      authProfile: req.session.AUTHPROFILE,
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
  sessionCheck(req, res, next);
  helper.tokenControl(req, function (response) {

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
    // Start the request
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.render('home', {
          data: JSON.parse(body),
          authProfile: req.session.AUTHPROFILE,
          title: 'Home'
        });
      } else {
        res.send(error);
      }
    })
  });
});

/* GET add page. */
router.get('/add', function (req, res, next) {
  sessionCheck(req, res, next);
  helper.tokenControl(req, function (response) {
    var options = {
      url: constants.URL + '/sector/all',
      method: 'GET',
      headers: {
        'Authorization': response
      }
    }
    request(options, function (error, result, body) {
      if (!error && result.statusCode == 200) {
        helper.getAllSectors(req, function (allSectors) {
          helper.getAllGroups(req, function (allGroups) {
            helper.getAllStatus(req, function (allStatus) {
              helper.getAllCountries(req, function (allCountries) {
                res.render('add', {
                  title: 'Add',
                  authProfile: req.session.AUTHPROFILE,
                  allSectors: JSON.parse(allSectors),
                  allGroups: JSON.parse(allGroups),
                  allCountries: JSON.parse(allCountries),
                  allStatus: JSON.parse(allStatus)
                })
              })
            })
          })
        })
      } else {
        res.send(error);
      }
    })
  });
});



/* GET detail page. */
router.get('/detail/:id', function (req, res, next) {
  sessionCheck(req, res, next);
  helper.tokenControl(req, function (response) {
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
          authProfile: req.session.AUTHPROFILE,
        });
      }
    })
  })
});

/* GET update page. */
router.get('/update/:id', function (req, res, next) {
  sessionCheck(req, res, next);
  helper.tokenControl(req, function (response) {
    var options = {
      url: constants.URL + '/startup/' + req.params.id,
      method: 'GET',
      headers: {
        'Authorization': response
      }
    }
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        var values = [];
        for (var i = 0; i < data.tags.length; i++) {
          values.push(data.tags[i].name);
        }

        helper.getAllSectors(req, function (allSectors) {
          helper.getAllGroups(req, function (allGroups) {
            helper.getAllStatus(req, function (allStatus) {
              helper.getAllCountries(req, function (allCountries) {
                res.render('update', {
                  data: data,
                  values: values.join(),
                  title: 'Update',
                  authProfile: req.session.AUTHPROFILE,
                  allSectors: JSON.parse(allSectors),
                  allGroups: JSON.parse(allGroups),
                  allCountries: JSON.parse(allCountries),
                  allStatus: JSON.parse(allStatus)
                })
              })
            })
          })
        })
      } else {
        res.send(error);
      }
    })
  })
})

/* GET profile page. */
router.get('/profile', function (req, res, next) {
  sessionCheck(req, res, next);
  helper.tokenControl(req, function (response) {
    res.render('profile', {
      title: 'Profile',
      authProfile: req.session.AUTHPROFILE,
    });
  });
});

module.exports = router;
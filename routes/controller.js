var express = require('express');
var router = express.Router();
var helper = require('../utils/helper');
var constants = require('../utils/constants');
var request = require('request');

/* GET users listing. */
router.get('/getConsumers', function (req, res, next) {
  helper.tokenControl("ertugrulungor", "1234", function (response) {
    res.send(response);
  });

});

router.get('/getStartupLogs/:id', function (req, res, next) {
  helper.tokenControl("ertugrulungor", "1234", function (response) {
    
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


module.exports = router;

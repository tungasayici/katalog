var express = require('express');
var router = express.Router();
var helper = require('../utils/helper');

/* GET users listing. */
router.get('/getConsumers', function(req, res, next) {
  helper.tokenControl("ertugrulungor","1234", function(response){
    res.send(response);
  });
  
});


module.exports = router;

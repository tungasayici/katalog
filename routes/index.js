var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'Express' });
});

module.exports = router;

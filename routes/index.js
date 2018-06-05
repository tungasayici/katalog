var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET sign up page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

/* GET lockscreen page. */
router.get('/lockscreen', function(req, res, next) {
  res.render('lockscreen', { title: 'Lockscreen' });
});

/* GET lockscreen page. */
router.get('/forgotpassword', function(req, res, next) {
  res.render('forgotpassword', { title: 'Forgot Password' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

/* GET add page. */
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Add' });
});

/* GET detail page. */
router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'Detail' });
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

module.exports = router;

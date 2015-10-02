var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/flash', function(req, res){
  req.flash('info', 'Hi there!');
  res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', message: req.flash() });
});

// GET /signup
router.get('/signup', function(req, res, next) {
  res.render('signup.ejs', { message: req.flash() });
});

// POST /signup
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/todos',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signUpStrategy(req, res, next)
});

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash() });
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/todos',
    failureRedirect : '/login',
    failureFlash : true
  });

  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

// Restricted page
router.get('/secret', function(req, res, next) {
  if (currentUser) {
    res.render('secret.ejs');
  }
  else {
    res.redirect('/');
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
var database = require('../modules/database')
var settings = require('../config/settings');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/logout', function(req, res, next) {
  // do something to end auth then redirect
  res.redirect('/');
});

module.exports = router;

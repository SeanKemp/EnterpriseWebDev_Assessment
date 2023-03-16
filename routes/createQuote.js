var express = require('express');
var router = express.Router();
var database = require('../modules/database');
var settings = require('../config/settings');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('createQuote');
});




module.exports = router;

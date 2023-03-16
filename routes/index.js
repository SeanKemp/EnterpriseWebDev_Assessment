var express = require('express');
var router = express.Router();
var database = require('../modules/database')
var quoteCalculation = require('../modules/quoteCalculation');
var settings = require('../config/settings');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/logout', function(req, res, next) {
  // do something to end auth then redirect
  res.redirect('/');
});

router.get('/api/addWorker', function(req, res) {
  var hours = req.query.hours;
  var hourlyRate = req.query.hourlyRate;
  //console.log("API GET")
  res.send(""+quoteCalculation.calculateWorkerCost(hours, hourlyRate));
});


module.exports = router;

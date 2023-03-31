import express from 'express'
const router = express.Router();
import settings from '../config/settings.js'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('createQuote');
});




export default router;
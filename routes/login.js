import express from 'express'
const router = express.Router();
import database from '../modules/database.js'
import settings from '../config/settings.js'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});




export default router;
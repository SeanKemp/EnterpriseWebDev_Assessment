import express from 'express'
import authCtrl from '../modules/auth.controller.js'
import quoteCalculation from '../modules/quoteCalculation.js'

const router = express.Router()

router.route('/api/quote/addWorker')
  .get(function(req, res, next) {
    var hours = req.query.hours;
    var hourlyRate = req.query.hourlyRate;
    //console.log("API GET")
    res.send(""+quoteCalculation.calculateWorkerCost(hours, hourlyRate));
  })

  //authCtrl.requireSignin, authCtrl.hasAuthorization
export default router
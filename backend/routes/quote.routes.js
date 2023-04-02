import express from 'express'
import authCtrl from '../modules/auth.controller.js'
import quoteCalculation from '../modules/quoteCalculation.js'

const router = express.Router()

router.route('/api/quote/addWorker')
  .post(function(req, res) {
    try {
      var hours = req.body.hours;
      var hourlyRate = req.body.hourlyRate;
      console.log(hours)
      console.log("API addWorker POST")
      res.json(quoteCalculation(hours, hourlyRate))
    } catch (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
    }  
    
    //return res.json({workerCost: quoteCalculation(hours, hourlyRate)})
    //res.send(""+quoteCalculation(hours, hourlyRate));
  })

  //authCtrl.requireSignin, authCtrl.hasAuthorization
export default router
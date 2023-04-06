import express from 'express'
import authCtrl from '../modules/auth.controller.js'
import quoteCtrl from '../modules/quote.controller.js'

const router = express.Router()

// Quote route for worker cost calculation
router.route('/api/quote/addWorker')
  .post(quoteCtrl.addWorker)
  
// Quote route for authenticated database access
router.route('/api/quote')
  .get(authCtrl.requireSignin, quoteCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.create)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.remove)


export default router
import express from 'express'
import authCtrl from '../modules/auth.controller.js'
import quoteCtrl from '../modules/quote.controller.js'

const router = express.Router()

router.route('/api/quote/addWorker')
  .post(quoteCtrl.addWorker)
  
router.route('/api/quote')
  .get(authCtrl.requireSignin, quoteCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.create)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.remove)

    
router.route('/createQuote/:quoteId').get(authCtrl.requireSignin, authCtrl.hasAuthorization)

router.param('quoteId', quoteCtrl.quoteByID)

export default router
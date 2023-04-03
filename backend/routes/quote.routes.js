import express from 'express'
import authCtrl from '../modules/auth.controller.js'
import quoteCtrl from '../modules/quote.controller.js'

const router = express.Router()

router.route('/api/quote/addWorker')
  .post(quoteCtrl.addWorker)
  
router.route('/api/quote')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.list)
  .post(quoteCtrl.create)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.remove)

//router.route('/api/quote/:userId')
    

export default router
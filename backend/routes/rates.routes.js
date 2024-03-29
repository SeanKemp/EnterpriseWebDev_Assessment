import express from 'express'
import authCtrl from '../modules/auth.controller.js'
import ratesCtrl from '../modules/rates.controller.js'

const router = express.Router()

// Route to limit access to rates page, not allowing users to go directly to route from URL
router.route('/admin/rates').get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization)

// Rate route for limited field database access 
router.route('/api/rates/quote')  
  .get(ratesCtrl.listForQuote)

// Rate route for database access
router.route('/api/rates')
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, ratesCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, ratesCtrl.create)
  .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, ratesCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, ratesCtrl.remove)


export default router
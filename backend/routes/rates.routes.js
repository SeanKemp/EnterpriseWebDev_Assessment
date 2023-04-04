import express from 'express'
import authCtrl from '../modules/auth.controller.js'
import ratesCtrl from '../modules/rates.controller.js'

const router = express.Router()

  
router.route('/api/rates')
  .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, ratesCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, ratesCtrl.create)
  .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, ratesCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, ratesCtrl.remove)

//router.route('/api/quote/:userId')
    

export default router
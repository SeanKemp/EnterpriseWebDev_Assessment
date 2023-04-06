import express from 'express'
import authCtrl from '../modules/auth.controller.js'

const router = express.Router()

// Authentication routes
router.route('/auth/signin')
  .post(authCtrl.signin)
router.route('/auth/signout')
  .get(authCtrl.signout)

export default router
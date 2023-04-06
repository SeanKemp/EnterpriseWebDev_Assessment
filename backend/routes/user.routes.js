import express from 'express'
import userCtrl from '../modules/user.controller.js'
import authCtrl from '../modules/auth.controller.js'

const router = express.Router()

// User route for unauthenticated database access
router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

// User route for authenticated database access
router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)


export default router

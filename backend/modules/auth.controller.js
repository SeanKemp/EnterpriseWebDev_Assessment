import User from './user.model.js'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../config/config.js'

const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      "username": req.body.username
    })
    if (!user)
      return res.status(401).json({
        error: "User not found"
      })

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({
        error: "Username and password don't match."
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        is_admin: user.is_admin
      }
    })
  
  } catch (err) {   
    return res.status(401).json({
      error: "Could not sign in"
    })
  }     

}

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status(200).json({
    message: "signed out"
  })
}

const requireSignin = expressJwt.expressjwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['HS256']
})

const hasAuthorization = (req, res, next) => {
  console.log(req.auth)
  const authorized = req.body && req.auth && req.body.user_id == req.auth._id
  console.log("Checking Auth")
  if (!(authorized)) {
    return res.status(403).json({
      error: "User is not authorized"
    })
  }
  next()
}

const hasAdminAuthorization = async (req, res, next) => {
  let user = await User.findById(req.auth._id)
  const authorized = req.auth && user.is_admin == true
  console.log("Checking Admin Auth")
  if (!(authorized)) {
    return res.status(403).json({
      error: "User is not authorized"
    })
  }
  next()
}


// Checks if web auth env variable is setup
const hasWebAuth = function() {
  const authorized = config.webAuth === 'cm1604413'
  if (!(authorized)) {
    return false;
  } else return true;
}

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  hasWebAuth,
  hasAdminAuthorization
}

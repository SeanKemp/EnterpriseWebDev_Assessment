import User from './user.model.js'
import lodash from 'lodash'
import errorHandler from './dbErrorHandler.js'
import authCtrl from './auth.controller.js'

// Create new User data
const create = async (req, res) => {  
  const user = new User(req.body)
  try {
    // if web auth env variable is not setup user cannot be saved as admin
    if (!authCtrl.hasWebAuth()) {
      user.is_admin = false
    }
    await user.save()
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// List selected fields of User data
const list = async (req, res) => {
  try {
      let users = await User.find().select('name username updated created')
      res.json(users)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}

// Return user data from user id
const userByID = async (req, res, next, id) => {
  try {
      let user = await User.findById(id)
      if (!user)
        return res.status('400').json({
          error: "User not found"
        })
      req.profile = user
      next()
  } catch (err) {
      return res.status('400').json({
        error: "Could not retrieve user"
      })
  }  
}

// Remove sensitive data before sending back to frontend
const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

// Update existing User data
const update = async (req, res) => {
  try {
      let user = req.profile
      user = lodash.extend(user, req.body)
      user.updated = Date.now()
      // if web auth is not setup in env variables then is_admin cannot be changed
      userLoad = User.findOne({"username": user.username})
      if (user.is_admin != 
        userLoad.is_admin)  {
          if (!authCtrl.hasWebAuth()) {
            user.is_admin = userLoad.is_admin
          }
        }
      await user.save()
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}

// Remove specified user data
const remove = async (req, res) => {
  try {
      let user = req.profile
      let deletedUser = await user.deleteOne()
      deletedUser.hashed_password = undefined
      deletedUser.salt = undefined
      res.json(deletedUser)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update
}

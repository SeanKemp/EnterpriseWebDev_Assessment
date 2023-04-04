import Rates from './rates.model.js'
import lodash from 'lodash'
import errorHandler from './dbErrorHandler.js'

const create = async (req, res) => {
    console.log("Creating Rate")  
  const rate = new Rates(req.body)
  try {
    await rate.save()
    return res.status(200).json({
      message: "Successfully saved Rate!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
      let rates = await Rates.find()
      res.json(rates)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}

const update = async (req, res) => {
  try {
      let rate = req.profile
      rate = lodash.extend(rate, req.body)

      await rate.save()
      res.json(rate)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}

const remove = async (req, res) => {
  try {
      let rate = req.profile
      let deletedRate = await rate.remove()
      res.json(deletedRate)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}


export default {
    create,
    list,
    update,
    remove
  }
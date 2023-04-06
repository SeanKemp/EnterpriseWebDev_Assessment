import Rates from './rates.model.js'
import lodash from 'lodash'
import errorHandler from './dbErrorHandler.js'

// Create new Rate data
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

// List all Rate data
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

// List all Rate data with limited fields to prevent users from seeing the rate
const listForQuote = async (req, res) => {
  try {
      let rates = await Rates.find().select('rate_index rate_name')
      res.json(rates)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}

// Update existing Rate data
const update = async (req, res) => {
  try {
      console.log("Updating Rate")
      let rate = await Rates.findById(req.body._id)
      rate = lodash.extend(rate, req.body)

      await rate.save()
      res.json(rate)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}

// Remove existing Rate data
const remove = async (req, res) => {
  try {
      console.log("Removing Rate")
      let rate = await Rates.findById(req.body._id)
      let deletedRate = await rate.deleteOne()
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
    listForQuote,
    update,
    remove
  }
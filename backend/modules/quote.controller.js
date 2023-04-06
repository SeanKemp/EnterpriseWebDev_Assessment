import quoteCalculation from '../modules/quoteCalculation.js'
import Quote from './quote.model.js'
import lodash from 'lodash'
import errorHandler from './dbErrorHandler.js'
import authCtrl from './auth.controller.js'
import Rates from './rates.model.js'

// Create new quote data
const create = async (req, res) => {
    console.log("Creating Quote")  
  const quote = new Quote(req.body)
  try {
    await quote.save()
    return res.status(200).json({
      message: "Successfully saved quote!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// List all quote data by a specified user
const list = async (req, res) => {
  try {
      let quotes = await Quote.find({user_id: req.auth._id})
      res.json(quotes)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}



// Update quote data by quote id
const update = async (req, res) => {
  try {
    console.log("Updating Quote")
      let quote = await Quote.findById(req.body._id)
      console.log(quote)
      quote = lodash.extend(quote, req.body)
      quote.updated = Date.now()

      await quote.save()
      res.json(quote)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}

// Remove quote data by quote id
const remove = async (req, res) => {
  try {
    console.log("Removing Quote")
      let quote = await Quote.findById(req.body._id)
      console.log(quote)
      let deletedQuote = await quote.deleteOne()
      res.json(deletedQuote)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}

// Receive worker data and return calculation from quoteCalculation module
const addWorker = async (req, res) => {
    try {
      var hours = req.body.hours;
      var hourlyRate = req.body.hourlyRate;
      var useFudge = req.body.useFudge;
      console.log(useFudge)
      let rate = await Rates.findOne({rate_index: hourlyRate})
      console.log("API addWorker POST")
      res.json(quoteCalculation(hours, rate.rate, useFudge))
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
    remove,
    addWorker
  }
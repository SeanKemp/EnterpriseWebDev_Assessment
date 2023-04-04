import quoteCalculation from '../modules/quoteCalculation.js'
import Quote from './quote.model.js'
import lodash from 'lodash'
import errorHandler from './dbErrorHandler.js'
import authCtrl from './auth.controller.js'

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

const list = async (req, res) => {
  try {
      let quotes = await Quote.find({user_id: req.auth._id})//.select('username quote_name workers resources final_budget updated created')
      res.json(quotes)
  } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }  
}

const quoteByID = async (req, res, next, id) => {
  try {
      let quote = await Quote.findById(id)
      if (!quote)
        return res.status('400').json({
          error: "Quote not found"
        })
      req.profile = quote
      next()
  } catch (err) {
      return res.status('400').json({
        error: "Could not retrieve quote"
      })
  }  
}

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


const addWorker = (req, res) => {
    try {
      var hours = req.body.hours;
      var hourlyRate = req.body.hourlyRate;
      console.log(hours)
      console.log("API addWorker POST")
      res.json(quoteCalculation(hours, hourlyRate))
    } catch (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
    }  
    
    //return res.json({workerCost: quoteCalculation(hours, hourlyRate)})
    //res.send(""+quoteCalculation(hours, hourlyRate));
}






export default {
    create,
    list,
    quoteByID,
    update,
    remove,
    addWorker
  }
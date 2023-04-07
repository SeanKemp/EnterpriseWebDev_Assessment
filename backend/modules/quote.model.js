import mongoose from 'mongoose'

// Quote schema for mongoDB database
const QuoteSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: 'UserId is needed to save quote'
    },
    username: {
        type: String,
        trim: true,
        required: 'User is needed to save quote'
    },
    quote_name: {
        type: String,
        trim: true,
        required: 'Quote name is required'
    },
    tasks: {
        type: Array
    },
    final_budget: {
      type: Number,
      required: 'Final Budget is required'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

const quoteModel = mongoose.model('Quotes', QuoteSchema);
quoteModel.createIndexes();
export default quoteModel

import mongoose from 'mongoose'


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
    workers: {
        type: Array
    },
    workers_cost: {
        type: Number
    },
    resources: {
        type: Array
    },
    resources_cost: {
        type: Number
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

//QuoteSchema.index({ username: 1, quote_number: 1}, { unique: true });



const quoteModel = mongoose.model('Quotes', QuoteSchema);
quoteModel.createIndexes();
export default quoteModel

import mongoose from 'mongoose'


const RatesSchema = new mongoose.Schema({
    rate_index: {
        index: true,
        type: String,
        required: 'UserId is needed to save quote'
    },
    rate_name: {
        type: String,
        trim: true,
        required: 'Rate name is needed to save rate'
    },
    rate: {
        type: String,
        trim: true,
        required: 'Rate is required'
    }
})


const ratesModel = mongoose.model('Rates', RatesSchema);
ratesModel.createIndexes();
export default ratesModel

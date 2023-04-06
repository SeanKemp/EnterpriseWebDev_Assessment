import config from '../config/config.js'
import mongoose from 'mongoose'
const MONGOURI = config.mongoUri;

// Try to connect to database on server start
mongoose.Promise = global.Promise;
mongoose.connect(MONGOURI);
mongoose.connection.on('error', err => {
    throw new Error(`unable to connect to database: ${MONGOURI}`)
});
console.log("Connected to Database")

const DatabaseSchema = new mongoose.Schema({});

const databaseModel = mongoose.model(config.env, DatabaseSchema);

export default databaseModel

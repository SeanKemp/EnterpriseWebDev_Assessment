//import { MongoClient } from 'mongodb'
import settings from '../config/settings.js'
import mongoose from 'mongoose'
const MONGOURI = settings.mongoUri;

mongoose.Promise = global.Promise;
mongoose.connect(MONGOURI);
mongoose.connection.on('error', err => {
    throw new Error(`unable to connect to database: ${MONGOURI}`)
});
console.log("Connected to Database")

const DatabaseSchema = new mongoose.Schema({});

const databaseModel = mongoose.model(settings.env, DatabaseSchema);

export default databaseModel

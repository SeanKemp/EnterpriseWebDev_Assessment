import settings from '../config/settings.js'

const calculateWorkerCost = function calculateWorkerCost(hours, hourlyRate) {
    return hours * (hourlyRate * settings.fudgeFactor);
}
// Probably need to connect to database to get hourlyRate values from the id that will be sent to here

export default calculateWorkerCost;
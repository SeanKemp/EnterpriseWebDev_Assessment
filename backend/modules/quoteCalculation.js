import config from '../config/config.js'

const calculateWorkerCost = function (hours, hourlyRate) {
    return hours * (hourlyRate * config.fudgeFactor);
}

const calculateFinalBudget = function () {
    
}
// Probably need to connect to database to get hourlyRate values from the id that will be sent to here

export default calculateWorkerCost;
import config from '../config/config.js'

const calculateWorkerCost = function (hours, hourlyRate) {
    return parseFloat((parseFloat(hours) * (parseFloat(hourlyRate) * config.fudgeFactor)).toFixed(2));
}


export default calculateWorkerCost;
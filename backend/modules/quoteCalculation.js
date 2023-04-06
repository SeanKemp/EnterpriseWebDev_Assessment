import config from '../config/config.js'

// Calculation for worker cost using fudge factor, with option for admins to not use it
const calculateWorkerCost = function (hours, hourlyRate, useFudge) {
    return parseFloat((parseFloat(hours) * (parseFloat(hourlyRate) * ((useFudge)?config.fudgeFactor:1))).toFixed(2));
}


export default calculateWorkerCost;
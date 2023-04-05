import config from '../config/config.js'

const calculateWorkerCost = function (hours, hourlyRate, useFudge) {
    return parseFloat((parseFloat(hours) * (parseFloat(hourlyRate) * ((useFudge)?config.fudgeFactor:1))).toFixed(2));
}


export default calculateWorkerCost;
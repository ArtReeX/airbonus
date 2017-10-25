/*globals module, require*/

/*-------------- ЭКСПОРТ МЕТОДОВ ДЛЯ ОБРАБОТЧИКОВ API ------------------*/
module.exports.getAirlines = require("./methods/getAirlines");
module.exports.getAirportsByLine = require("./methods/getAirportsByLine");
module.exports.getAllCards = require("./methods/getAllCards");
module.exports.getAmExCards = require("./methods/getAmExCards");
module.exports.getCalculatedData = require("./methods/getCalculatedData");
module.exports.getCreditScores = require("./methods/getCreditScore");
module.exports.getCreditScoreById = require("./methods/getCreditScoreById");
module.exports.getIncomes = require("./methods/getIncome");
module.exports.getIncomeById = require("./methods/getIncomeById");
module.exports.getMaritalStatus = require("./methods/getMaritalStatus");
module.exports.getMinCreditScores = require("./methods/getMinCreditScore");
module.exports.getMinIncome = require("./methods/getMinIncome");
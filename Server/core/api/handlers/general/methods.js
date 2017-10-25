/*globals module, require*/

/*-------------- ЭКСПОРТ МЕТОДОВ ДЛЯ ОБРАБОТЧИКОВ API ------------------*/
module.exports.getAirlines = require("./methods/getAirlines");
module.exports.getAirportsByLine = require("./methods/getAirportsByLine");
module.exports.getAllCards = require("./methods/getAllCards");
module.exports.getAmExCards = require("./methods/getAmExCards");
module.exports.getCalculatedData = require("./methods/getCalculatedData");
module.exports.getCreditScores = require("./methods/getCreditScores");
module.exports.getCreditScoreById = require("./methods/getCreditScoreById");
module.exports.getIncomes = require("./methods/getIncomes");
module.exports.getIncomeById = require("./methods/getIncomeById");
module.exports.getMaritalStatuses = require("./methods/getMaritalStatuses");
module.exports.getMinCreditScores = require("./methods/getMinCreditScores");
module.exports.getMinIncome = require("./methods/getMinIncome");
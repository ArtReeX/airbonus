/*globals module, require*/

/*-------------- ЭКСПОРТ ОБРАБОТЧИК ДЛЯ API ------------------*/
module.exports.getAirportsFrom = require("./handlers/getAirportsFrom");
module.exports.getAirportsTo = require("./handlers/getAirportsTo");
module.exports.setAirports = require("./handlers/setAirports");
module.exports.getAirlines = require("./handlers/getAirlines");
module.exports.getCreditScores = require("./handlers/getCreditScores");
module.exports.setCreditScores = require("./handlers/setCreditScores");
module.exports.getIncomes = require("./handlers/getIncomes");
module.exports.setIncome = require("./handlers/setIncome");
module.exports.setCardCount = require("./handlers/setCardCount");
module.exports.getMaritalStatuses = require("./handlers/getMaritalStatuses");
module.exports.getAllCards = require("./handlers/getAllCards");
module.exports.setAllCards = require("./handlers/setAllCards");
module.exports.getAmExCards = require("./handlers/getAmExCards");
module.exports.setAmExCards = require("./handlers/setAmExCards");
module.exports.setOtherParams = require("./handlers/setOtherParams");
module.exports.getCalculatedData = require("./handlers/getCalculatedData");

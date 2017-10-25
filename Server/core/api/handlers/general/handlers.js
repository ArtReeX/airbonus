/*globals module, require*/

/*-------------- ЭКСПОРТ ОСНОВНЫХ МЕТОДОВ ------------------*/

module.exports.getAirportsFrom = require("./handlers/getAirportsFrom");
module.exports.getAirportsTo = require("./handlers/getAirportsTo");
module.exports.setAirportFrom = require("./handlers/setAirportFrom");
module.exports.setAirportTo = require("./handlers/setAirportTo");
module.exports.getAirlines = require("./handlers/getAirlines");
module.exports.getCreditScore = require("./handlers/getCreditScore");
module.exports.setCreditScore = require("./handlers/setCreditScore");
module.exports.getIncome = require("./handlers/getIncome");
module.exports.setIncome = require("./handlers/setIncome");
module.exports.setCardCount = require("./handlers/setCardCount");
module.exports.getMaritalStatus = require("./handlers/getMaritalStatus");
module.exports.getAllCard = require("./handlers/getAllCard");
module.exports.setAllCards = require("./handlers/setAllCards");
module.exports.getAmExCard = require("./handlers/getAmExCard");
module.exports.setAmExCard = require("./handlers/setAmExCard");
module.exports.setOtherParams = require("./handlers/setOtherParams");
module.exports.getCalculatedData = require("./handlers/getCalculatedData");

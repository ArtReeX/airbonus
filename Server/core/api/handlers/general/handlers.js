/*globals module, require*/

/*-------------- ЭКСПОРТ ОБРАБОТЧИК ДЛЯ API ------------------*/
module.exports.airports = require("./handlers/airports");
module.exports.airlines = require("./handlers/airlines");
module.exports.scores = require("./handlers/scores");
module.exports.incomes = require("./handlers/incomes");
module.exports.statuses = require("./handlers/statuses");
module.exports.cards = require("./handlers/cards");
module.exports.others = require("./handlers/others");
module.exports.calculated = require("./handlers/calculated");
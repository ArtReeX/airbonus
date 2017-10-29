/*globals module, require*/

/*-------------- ЭКСПОРТ ОБРАБОТЧИК ДЛЯ API ------------------*/
module.exports.airports = require("./handlers/airports");
module.exports.airlines = require("./handlers/airlines");
module.exports.scores = require("./handlers/scores");
module.exports.incomes = require("./handlers/incomes");
module.exports.cards = require("./handlers/cards");
module.exports.others = require("./handlers/others");
module.exports.computation = require("./handlers/computation");
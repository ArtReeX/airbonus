/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА AMEX КАРТ
function getAmExCards(sql, name_db, callback) {
    'use strict';

    // обращение к БД

    // получение карт от банка American Express
    sql.request().query("SELECT cards.id, cards.name, cards.image FROM " + name_db + ".cards, " + name_db + ".consts WHERE cards.bank_id=consts.value AND consts.name='AmEx_Bank_ID'", function (error, rows) {

        if (error) {
            log.debug("Error MySQL connection: " + error);
        } else {
            callback(rows.recordset);
        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getAmExCards;

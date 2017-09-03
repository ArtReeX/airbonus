/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА МИНИМАЛЬНОГО КРЕДИТНОГО РЕЙТИНГА
function getMinCreditScore(sql, name_db, callback) {
    'use strict';

    // обращение к БД

    // основная часть
    sql.request().query("SELECT value FROM " + name_db + ".consts WHERE name='Min_Credit_Score'", function (error, rows) {

        if (error) {
            log.debug("Error MySQL connection: " + error);
        } else {
            callback(rows.recordset[0].value);
        }

    });
    
}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getMinCreditScore;

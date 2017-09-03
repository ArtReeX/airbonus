/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА КРЕДИТНОГО РЕЙТИНГА
function getCreditScore(sql, name_db, callback) {
    'use strict';

    // обращение к БД

    // основная часть
    sql.request().query("SELECT id,min,max FROM " + name_db + ".credit_score ORDER BY min", function (error, rows) {

        if (error) {
            log.debug("Error MySQL connection: " + error);
        } else {
            callback(rows.recordset);
        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getCreditScore;

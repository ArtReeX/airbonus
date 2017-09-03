/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА КРЕДИТНОГО РЕЙТИНГА ПО ИДЕНТИФИКАТОРУ
function getCreditScoreById(sql, name_db, id, callback) {
    'use strict';

    // обращение к БД

    // основная часть
    sql.request().query("SELECT TOP 1 min,max FROM " + name_db + ".credit_score WHERE id=" + id, function (error, rows) {

        if (error) {
            log.debug("Error MySQL connection: " + error);
        } else {

            callback({
                min: rows.recordset[0].min,
                max: rows.recordset[0].max
            });
        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getCreditScoreById;

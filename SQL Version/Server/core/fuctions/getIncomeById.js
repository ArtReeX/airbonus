/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА ДОХОДА ПО ИДЕНТИФИКАТОРУ
function getIncomeById(sql, name_db, id, callback) {
    'use strict';

    // обращение к БД

    // основная часть
    sql.request().query("SELECT TOP 1 min,max,min_credit_score FROM " + name_db + ".income WHERE id=" + id, function (error, rows) {

        if (error) {
            log.debug("Error MySQL connection: " + error);
        } else {

            callback({
                min: rows.recordset[0].min,
                max: rows.recordset[0].max,
                min_credit_score: rows.recordset[0].min_credit_score
            });

        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getIncomeById;

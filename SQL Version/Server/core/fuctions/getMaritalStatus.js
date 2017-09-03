/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА АЭРОПОРТОВ ПО СТРОКЕ
function getMaritalStatus(sql, name_db, callback) {
    'use strict';

    // обращение к БД

    // основная часть
    sql.request().query("SELECT id, name, value FROM " + name_db + ".marital_status ORDER BY name", function (error, rows) {

        if (error) {
            log.debug("Error MySQL connection: " + error);
        } else {
            callback(rows.recordset);
        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getMaritalStatus;

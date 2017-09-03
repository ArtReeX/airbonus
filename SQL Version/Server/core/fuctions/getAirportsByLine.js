/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА АЭРОПОРТОВ ПО СТРОКЕ
function getAirportsByLine(sql, name_db, line, callback) {
    'use strict';

    // обращение к БД

    // основная часть
    sql.request().query("SELECT TOP 50 iata, name, city FROM " + name_db + ".airports WHERE iata LIKE '" + line + "%' OR city LIKE '" + line +
        "%' OR name LIKE '" + line + "%' ORDER BY iata",
        function (error, rows) {

            if (error) {
                log.debug("Error MySQL connection: " + error);
            } else {
                callback(rows.recordset);
            }

        });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getAirportsByLine;

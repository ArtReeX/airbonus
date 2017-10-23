/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА АЭРОПОРТОВ ПО СТРОКЕ
function getAirportsByLine(mysql, line, callback) {
    'use strict';

    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            // основная часть
            conn.query("SELECT iata, name, city FROM airports WHERE iata RLIKE '^" + line + "' OR city RLIKE '^" + line +
                "' OR name RLIKE '^" + line + "' ORDER BY iata",
                function (error, rows) {

                    if (error) {
                        log.debug("Error MySQL connection: " + error);
                    } else {
                        callback(rows);
                    }

                    // закрытие запроса
                    conn.release();

                });

        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getAirportsByLine;

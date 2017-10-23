/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА АЭРОПОРТОВ
function getAirlines(mysql, source, destination, callback) {
    'use strict';

    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            // узнаём идентификаторы всех авиалиний из рейсов
            conn.query("SELECT iata,name FROM airlines,routes WHERE airlines.iata=routes.airline_id AND routes.source='" + source + "' AND routes.destination='" + destination + "'", function (error, airlines) {

                if (error) {
                    log.debug("Error MySQL connection: " + error);
                } else {

                    callback(airlines);

                    // закрытие запроса
                    conn.release();
                }

            });

        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getAirlines;

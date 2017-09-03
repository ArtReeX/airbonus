/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА АЭРОПОРТОВ
function getAirlines(sql, name_db, source, destination, callback) {
    'use strict';

    // обращение к БД

    // узнаём идентификаторы всех авиалиний из рейсов
    sql.request().query("SELECT iata,name FROM " + name_db + ".airlines, " + name_db + ".routes WHERE airlines.iata=routes.airline_id AND routes.source='" + source + "' AND routes.destination='" + destination + "'", function (error, airlines) {

        if (error) {
            log.debug("Error SQL connection: " + error);
        } else {

            callback(airlines.recordset);
        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getAirlines;

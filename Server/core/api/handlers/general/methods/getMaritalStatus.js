/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА АЭРОПОРТОВ ПО СТРОКЕ
function getMaritalStatus(mysql, callback) {
    'use strict';

    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            // основная часть
            conn.query("SELECT id, name, value FROM marital_status ORDER BY name", function (error, rows) {

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
module.exports = getMaritalStatus;

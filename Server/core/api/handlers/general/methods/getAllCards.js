/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА ВСЕХ КАРТ
function getAllCards(mysql, callback) {
    'use strict';

    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            // основная часть
            conn.query("SELECT id,name,image FROM cards ORDER BY name", function (error, rows) {

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
module.exports = getAllCards;

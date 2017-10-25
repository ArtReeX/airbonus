/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА КРЕДИТНОГО РЕЙТИНГА ПО ИДЕНТИФИКАТОРУ
function getCreditScoreById(mysql, id, callback) {
    'use strict';

    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            // основная часть
            conn.query("SELECT min,max from credit_score WHERE id=" + id + " LIMIT 1", function (error, rows) {

                if (error) {
                    log.debug("Error MySQL connection: " + error);
                } else {
                    
                    callback({
                        min: rows[0].min,
                        max: rows[0].max
                    });
                }

                // закрытие запроса
                conn.release();

            });

        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getCreditScoreById;

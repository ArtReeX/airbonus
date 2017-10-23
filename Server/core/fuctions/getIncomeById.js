/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА ДОХОДА ПО ИДЕНТИФИКАТОРУ
function getIncomeById(mysql, id, callback) {
    'use strict';

    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            // основная часть
            conn.query("SELECT min,max,min_credit_score FROM income WHERE id=" + id  + " LIMIT 1", function (error, rows) {

                if (error) {
                    log.debug("Error MySQL connection: " + error);
                } else {

                    callback({
                        min: rows[0].min,
                        max: rows[0].max,
                        min_credit_score: rows[0].min_credit_score
                    });

                    // закрытие запроса
                    conn.release();

                }

            });

        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getIncomeById;

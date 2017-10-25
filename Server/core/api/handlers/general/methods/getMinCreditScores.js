/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
function getMinCreditScore(mysql, callback) {
    'use strict';

    // обращение к БД
    mysql.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {

            // основная часть
            conn.query("SELECT value FROM consts WHERE name='Min_Credit_Score'", function (error, rows) {

                if (error) {
                    log.debug("Error MySQL connection: " + error);
                } else {
                    callback(rows[0].value);
                }

                // закрытие запроса
                conn.release();

            });

        }

    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getMinCreditScore;
/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
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

/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getCreditScoreById;

/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
module.exports = function (params, database, callback) {
    'use strict';

    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) {
            
            // возврат результата
            callback({
                "error": { "type": "database" },
                "data": null
            });
            
        } else {

            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query("SELECT min,max,min_credit_score FROM income WHERE id=" + id  + " LIMIT 1", function (error, incomes) {

                if (error) {
                    
                    // возврат результата
                    callback({
                        "error": { "type": "database" },
                        "data": null
                    });
                    
                } else {

                    // возврат результата
                    callback({
                        "error": null,
                        "data": { 
                            "min": incomes[0].min,
                            "max": incomes[0].max,
                            "min_credit_score: incomes[0].min_credit_score
                        }
                    });

                }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};
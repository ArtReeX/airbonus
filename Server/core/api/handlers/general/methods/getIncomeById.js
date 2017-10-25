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
            connection.query("SELECT min,max,min_credit_score FROM income WHERE id=" + params.id  + " LIMIT 1", function (error, incomes) {

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
                            "min_credit_score": incomes[0].min_credit_score
                        }
                    });

                }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};
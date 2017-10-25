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
            connection.query("SELECT value FROM consts WHERE name='Min_Credit_Score'", function (error, scores) {

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
                        "data": { "score": scores[0].min }
                    });

                }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};
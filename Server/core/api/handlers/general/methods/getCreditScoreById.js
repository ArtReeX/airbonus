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
            connection.query("SELECT min, max from credit_score WHERE id=" + params.id + " LIMIT 1", function (error, scores) {

                if (error) {
                    
                    // возврат результата
                    callback({
                        "error": {
                            "type": "database"
                        },
                        "data": null
                    });
                    
                } else {

                    // возврат результата
                    callback({
                        "error": { "type": "database" },
                        "data": {
                            "min": scores[0].min,
                            "max": scores[0].max
                        }
                    });

                }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};
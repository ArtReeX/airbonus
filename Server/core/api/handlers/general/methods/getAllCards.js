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
            connection.query("SELECT id, name, image FROM cards ORDER BY name", function (error, cards) {

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
                        "data": { "cards": cards }
                    });

                }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};
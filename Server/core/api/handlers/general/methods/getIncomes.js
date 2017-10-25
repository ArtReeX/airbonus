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
            connection.query("SELECT id, min, max from income ORDER BY min", function (error, incomes) {

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
                        "data": { "incomes": incomes }
                    });

                }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};

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
            connection.query("SELECT value FROM consts WHERE name='Min_Income'", function (error, incomes) {

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
                        "data": { "income": incomes[0].min }
                    });

                }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};

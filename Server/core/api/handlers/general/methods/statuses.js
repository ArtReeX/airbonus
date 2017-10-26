/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
module.exports.get = function (params, database, callback) {
    
    'use strict';

    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) {
            
            // возврат результата
            callback({ "type": "database" }, null);
            
        } else {

            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query("SELECT id, name, value FROM marital_status ORDER BY name", function (error, statuses) {

                if (error) { callback({ "type": "database" }, null); } else { callback(null, statuses); }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};

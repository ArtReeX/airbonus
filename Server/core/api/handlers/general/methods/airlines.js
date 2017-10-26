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
            connection.query("SELECT name FROM airlines, routes WHERE airlines.iata=routes.airline_id AND routes.source='" + params.from + "' AND routes.destination='" + params.to + "'", function (error, airlines) {

                if (error) { callback({ "type": "database" }, null);  } else { callback(null, airlines); }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};

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
            connection.query("SELECT airlines.name FROM airlines, routes_per_region WHERE airlines.iata = routes_per_region.airline_iata AND routes_per_region.source = ? AND routes_per_region.destination = ?", [params.from, params.to], function (error, airlines) {

                if (error) { callback({ "type": "database" }, null);  } else { callback(null, airlines); }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};

/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
module.exports.getAll = function (params, database, callback) {
    
    'use strict';

    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback({ "type": "database" }, null); } else {

            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query("SELECT iata, name, city FROM airports ORDER BY iata", function (error, airports) {

                if (error) { callback({ "type": "database" }, null); } else { callback(null, airports); }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};

module.exports.getByLine = function (params, database, callback) {
    
    'use strict';

    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback({ "type": "database" }, null); } else {

            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query("SELECT iata, name, city FROM airports WHERE iata RLIKE ? OR city RLIKE ? OR name RLIKE ? ORDER BY iata", ["^" + params.line, "^" + params.line, "^" + params.line], function (error, airports) {

                if (error) { callback({ "type": "database" }, null); } else { callback(null, airports); }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};
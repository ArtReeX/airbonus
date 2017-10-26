/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
module.exports.getAll = function (params, database, callback) {
    
    'use strict';

    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) {
            
            // возврат результата
            callback({ "type": "database" }, null);
            
        } else {

            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query("SELECT id, min, max from credit_score ORDER BY min", function (error, scores) {

                if (error) {
                    
                    // возврат результата
                    callback({ "type": "database" }, null);
                    
                } else {

                    // возврат результата
                    callback(null, { "scores": scores });

                }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};

module.exports.getById = function (params, database, callback) {
    
    'use strict';

    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) {
            
            // возврат результата
            callback({ "type": "database" }, null);
            
        } else {

            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query("SELECT min, max from credit_score WHERE id=" + params.id + " LIMIT 1", function (error, scores) {

                if (error) { callback({ "type": "database" }, null); } else {

                    // возврат результата
                    callback(null, {
                        "min": scores[0].min,
                        "max": scores[0].max
                    });

                }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};

/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
module.exports.getAll = function (database, callback) {
    
    'use strict';

    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) {
            
            // возврат результата
            callback({ "type": "database" }, null);
            
        } else {

            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query("SELECT id, min, max from income ORDER BY min", function (error, incomes) {

                if (error) {callback({ "type": "database" }, null); } else { callback(null, incomes); }

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
            connection.query("SELECT min,max,min_credit_score FROM income WHERE id=" + Number(params.id)  + " LIMIT 1", function (error, incomes) {

                if (error) { callback({ "type": "database" }, null); } else {

                    // возврат результата
                    callback(null, {
                        "min": incomes[0].min,
                        "max": incomes[0].max,
                        "min_credit_score": incomes[0].min_credit_score
                    });
                }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};

/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
module.exports.creditMin = function (database, callback) {
    
    'use strict';

    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) {
            
            // возврат результата
            callback({ "type": "database" }, null);
            
        } else {

            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query("SELECT value FROM consts WHERE name = ?", ["Min_Credit_Score"], function (error, scores) {

                if (error) { callback({ "type": "database" }, null); } else { callback(null, scores[0].value); }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};

module.exports.incomeMin = function (database, callback) {
    
    'use strict';

    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) {
            
            // возврат результата
            callback({ "type": "database" }, null);
            
        } else {

            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query("SELECT value FROM consts WHERE name = ?", ["Min_Income"], function (error, incomes) {

                if (error) { callback({ "type": "database" }, null); } else { callback(null, incomes[0].value); }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};
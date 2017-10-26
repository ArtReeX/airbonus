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
            connection.query("SELECT id, name, image FROM cards ORDER BY name", function (error, cards) {

                if (error) { callback({ "type": "database" }, null); } else { callback(null, cards); }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};

module.exports.getAmEx = function (params, database, callback) {
    
    'use strict';

    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) {
            
            // возврат результата
            callback({ "type": "database" }, null);
            
        } else {

            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query("SELECT cards.id, cards.name, cards.image FROM cards, consts WHERE cards.bank_id=consts.value AND consts.name='AmEx_Bank_ID'", function (error, cards) {

                if (error) { callback({ "type": "database" }, null); } else { callback(null, cards); }

            });

        }
        
        // закрытие соединения
        connection.release();

    });

};
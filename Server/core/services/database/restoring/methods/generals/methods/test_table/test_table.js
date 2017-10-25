/*global require, module*/

/*-------------- ПРОВЕРКА СУЩЕСТВОВАНИЯ ОСНОВНОЙ ТАБЛИЦЫ "general_bugs_categories" ------------------*/
module.exports.check = function (database, callback) {
    
    'use strict';
    
    /*
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("SELECT * FROM general_bugs_categories LIMIT 1", function (error, result) {

                if (error) { callback(null, false); } else { callback(null, true); }

            });
            
        }
        
        // закрытие соединения
        connection.release();

    });
    */
    
    callback(null, true);
    
};

/*-------------- СОЗДАНИЕ ОСНОВНОЙ ТАБЛИЦЫ "general_bugs_categories" ------------------*/
module.exports.create = function (database, callback) {
    
    'use strict';
    
    /*
    
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("CREATE TABLE IF NOT EXISTS general_bugs_categories(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, UNIQUE(name))", function (error) {

                if (error) { callback(error); } else { callback(null); }

            });
            
        }
        
        // закрытие соединения
        connection.release();

    });
    
    */
    
    callback(null);
    
};

/*-------------- ЗАПОЛНЕНИЕ ОСНОВНОЙ ТАБЛИЦЫ "general_bugs_categories" ------------------*/
module.exports.fill = function (database, callback) {
    
    'use strict';
    
    /*
    
    // получение соединения
    database.getConnection(function (error, connection) {

        if (error) { callback(error); } else {
            
            connection.query("INSERT IGNORE INTO general_bugs_categories (name) VALUES ('Функционал сайта'), ('Дизайн сайта'), ('Ошибки языка')", function (error) {

                if (error) { callback(error); } else { callback(null); }

            });
            
        }
        
        // закрытие соединения
        connection.release();

    });
    
    */
    
    callback(null);
    
};

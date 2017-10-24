/*global require, module*/

/*-------------- ЗАГОЛОВКИ ------------------*/
var methods_module = require('./restoring/methods');

/*-------------- ВОССТАНОВЛЕНИЕ БАЗЫ ДАННЫХ ------------------*/
module.exports.restoring = function (database, async, callback) {
    
    'use strict';
    
    async.parallel([

        
        // ОСНОВНЫЕ ТАБЛИЦЫ
        function (done) {

            methods_module.generals(database, async, function (error) {
                
                if (error) { done(error); } else { done(); }
                
            });

        }

    ], function (error) {
        
        if (error) { callback(error); } else { callback(null); }
        
    });
    
};
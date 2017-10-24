/*globals require, module*/


/*---------------------------- СТАНДАРТНЫЕ ОБРАБОТЧИКИ -------------------------------*/
module.exports.set = function (socket, log, async, callback) {
    
    'use strict';
    
    // отключение клиента
    socket.on('disconnect', function () {

        // логгирование
        log.info("Пользователь " + socket.id + " отключился.");

    });
        
    callback(null);
    
};
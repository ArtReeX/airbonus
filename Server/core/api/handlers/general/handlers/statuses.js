/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.get = function (socket, methods, database, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод statuses_get.");
    
    methods.statuses.get(database, function (result_error, result_data) {

        // формирование пакета для отправки
        var message = {
            "error": result_error ? { "type": result_error } : null,
            "data": { "statuses": result_data }
        };
        
        // отправка результата
        log.trace("Отправка результата statuses_get методом statuses_get пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("statuses_get", message);

    });
    
};
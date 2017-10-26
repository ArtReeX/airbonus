/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.get = function (socket, params, methods, database, log, async) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод calculated_get.");
    
    methods.calculated.get(params, database, log, async, function (result_error, result_data) {

        // формирование пакета для отправки
        var message = {
            "error": result_error,
            "data": { "airlines": result_data }
        };
        
        // отправка результата
        log.trace("Отправка результата calculated_get методом calculated_get пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("calculated_get", message);

    });
    
};
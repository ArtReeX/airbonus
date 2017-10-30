/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.get = function (socket, config, methods, database, log, async) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод computation_get.");
    
    methods.computation.get(config, socket.session, database, log, async, function (result_error, result_data) {
        
        // изменение количества отдаваемых результатов
        if (result_data.length > 5) { result_data.length = 5; }
        
        // формирование пакета для отправки
        var message = {
            "error": result_error ? { "type": result_error } : null,
            "data": { "computation": result_data }
        };
        
        // отправка результата
        log.trace("Отправка результата computation_get методом computation_get пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("computation_get", message);

    });
    
};
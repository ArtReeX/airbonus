/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.get = function (socket, methods, database, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод airlines_get.");
    
    methods.airlines.get({
        "from": socket.session.userAirportFrom,
        "to": socket.session.userAirportTo
    }, database, function (result_error, result_data) {

        // формирование пакета для отправки
        var message = {
            "error": result_error ? { "type": result_error } : null,
            "data": { "airlines": result_data }
        };
        
        // отправка результата
        log.trace("Отправка результата airlines_get методом airlines_get пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("airlines_get", message);

    });
    
};
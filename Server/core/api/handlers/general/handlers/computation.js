/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.get = function (socket, config, methods, database, log, async) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод computation_get.");
    
    methods.computation.get(config, socket.session, database, log, async, function (result_error, result_data) {

        // формирование пакета для отправки
        var message = {
            "error": result_error ? { "type": result_error } : null,
            "data": { "computation" : result_data.results, "number_of_cards" : result_data.number_of_cards, "treated_combinations" : result_data.treated_combinations }
        };

        // отправка результата
        log.trace("Отправка результата computation_get методом computation_get пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("computation_get", message);

    });
    
};
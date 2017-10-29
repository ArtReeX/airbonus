/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.get = function (socket, methods, database, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод others_get.");
    
    methods.statuses.get(database, function (result_error, result_data) {

        // формирование пакета для отправки
        var message = {
            "error": result_error ? { "type": result_error } : null,
            "data": { "others": {"statuses" : result_data }}
        };
        
        // отправка результата
        log.trace("Отправка результата others_get методом statuses_get пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("others_get", message);

    });
    
};

module.exports.set = function (socket, params, methods, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод others_set параметрами: " + params);
    
    // переменные для хранения
    var message;

    if (Number(params.params.spendNextYear) < Number(params.params.spendNextMonth)) {
        
        // формирование пакета для отправки
        message = {
            "error": { "type": "annual_less_monthly" },
            "data": null
        };
        
    } else if (Boolean(Number(params.params.spendNextYear)) === false || Boolean(Number(params.params.spendNextMonth)) === false) {
        
        // формирование пакета для отправки
        message = {
            "error": { "type": "empty_memo" },
            "data": null
        };
        
    } else {
    
        socket.session.statusValue = Number(params.params.statusValue);
        
        socket.session.minPeople = Number(params.params.minPeople);
        socket.session.maxPeople = Number(params.params.maxPeople);
        
        socket.session.spendNextMonth = Number(params.params.spendNextMonth);
        socket.session.spendNextYear = Number(params.params.spendNextYear);

        // формирование пакета для отправки
        message = {
            "error": null,
            "data": { "next": true }
        };
        
    }
    
    // отправка результата
    log.trace("Отправка результата others_set методом others_set пользователю " + socket.id + ":");
    log.trace(message);

    socket.emit("others_set", message);
    
};
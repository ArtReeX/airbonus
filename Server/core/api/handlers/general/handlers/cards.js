/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.getAll = function (socket, methods, database, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод cards_get_all.");
    
    methods.cards.getAll(database, function (result_error, result_data) {

        // формирование пакета для отправки
        var message = {
            "error": result_error ? { "type": result_error } : null,
            "data": { "cards": result_data }
        };
        
        // отправка результата
        log.trace("Отправка результата cards_get_all методом cards_get_all пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("cards_get_all", message);

    });
    
};

module.exports.getAmEx = function (socket, methods, database, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод cards_get_amEx.");
    
    methods.cards.getAmEx(database, function (result_error, result_data) {

        // формирование пакета для отправки
        var message = {
            "error": result_error ? { "type": result_error } : null,
            "data": { "cards": result_data }
        };
        
        // отправка результата
        log.trace("Отправка результата cards_get_amEx методом cards_get_amEx пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("cards_get_amEx", message);

    });
    
};

module.exports.setAll = function (socket, params, methods, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод cards_set_all параметрами: " + params);
    
    socket.session.allCards = params.cards;
    
    // формирование пакета для отправки
    var message = {
        "error": null,
        "data": { "next": true }
    };

    // отправка результата
    log.trace("Отправка результата cards_set_all методом cards_set_all пользователю " + socket.id + ":");
    log.trace(message);

    socket.emit("cards_set_all", message);
    
};

module.exports.setAmEx = function (socket, params, methods, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод cards_get_amEx параметрами: " + params);
    
    socket.session.amExCards = params.cards;
    
    // формирование пакета для отправки
    var message = {
        "error": null,
        "data": { "next": true }
    };
    
    // отправка результата
    log.trace("Отправка результата cards_set_amEx методом cards_set_amEx пользователю " + socket.id + ":");
    log.trace(message);

    socket.emit("cards_set_amEx", message);
    
};
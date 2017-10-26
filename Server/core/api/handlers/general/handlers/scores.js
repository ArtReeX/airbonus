/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.get = function (socket, methods, database, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод scores_get.");
    
    methods.scores.getAll(database, function (result_error, result_data) {

        // формирование пакета для отправки
        var message = {
            "error": result_error,
            "data": { "scores": result_data }
        };
        
        // отправка результата
        log.trace("Отправка результата scores_get методом scores_get пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("scores_get", message);

    });
    
};

module.exports.set = function (socket, params, methods, database, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод scores_set с параметрами: " + params);
    
    // переменные для хранения
    var message;
    
    methods.scores.get.byId(params, database, function (result_error, result_data) {
        
        if (result_error) {
        
            // формирование пакета для отправки
            message = {
                "error": result_error,
                "data": { "scores": result_data }
            };
            
        } else {
        
            if (result_data.max <= socket.session.consts.creditMin) {
                
                // формирование пакета для отправки
                message = {
                    "error": "paucity",
                    "data": null
                };
                
            } else {
                
                socket.session.creditScoreMin = Number(result_data.min);
                socket.session.creditScoreMax = Number(result_data.max);
                
                // формирование пакета для отправки
                message = {
                    "error": null,
                    "data": { "next": true }
                };
                
            }
            
        }
        
        // отправка результата
        log.trace("Отправка результата scores_set методом scores_set пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("scores_set", message);

    });
    
};
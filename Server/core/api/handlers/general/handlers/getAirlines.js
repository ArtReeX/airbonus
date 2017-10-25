/*globals require, module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports = function (params, methods, socket, database, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод getAirlines с параметрами: " + params);
    
    methods.getAirlines(params, database, function (result) {

        if (result.error) {

            // ОБРАБОТКА ОШИБОК

            // отправка результата
            log.trace("Sending method resultGetAirlines results to " + socket.id + ":");
            log.trace({
                "error": {
                    "type": result.error.type
                },
                "data": null
            });

            socket.emit('resultGetAirlines', {
                "error": {
                    "type": result.error.type
                },
                "data": null
            });

        } else {

            // ОБРАБОТКА ОТВЕТОВ

            // отправка результата
            log.trace("Sending method resultGetAirlines results to " + socket.id + ":");
            log.trace({
                "error": null,
                "data": {
                    "result": result.data
                }
            });

            socket.emit('resultGetAirlines', {
                "error": null,
                "data": result.data
            });

        }

    });
    
};
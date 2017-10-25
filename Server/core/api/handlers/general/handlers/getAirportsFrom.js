/*globals require, module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports = function (params, methods, socket, database, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод getAirportsFrom с параметрами: " + params);
    
    methods.getAirportsByLine(params, database, function (result) {

        if (result.error) {

            // ОБРАБОТКА ОШИБОК

            // отправка результата
            log.trace("Sending method resultGetAirportsFrom results to " + socket.id + ":");
            log.trace({
                "error": {
                    "type": result.error.type
                },
                "data": null
            });

            socket.emit('resultGetAirportsFrom', {
                "error": {
                    "type": result.error.type
                },
                "data": null
            });

        } else {

            // ОБРАБОТКА ОТВЕТОВ

            // отправка результата
            log.trace("Sending method resultGetAirportsFrom results to " + socket.id + ":");
            log.trace({
                "error": null,
                "data": {
                    "result": result.data
                }
            });

            socket.emit('resultGetAirportsFrom', {
                "error": null,
                "data": result.data
            });

        }

    });
    
};
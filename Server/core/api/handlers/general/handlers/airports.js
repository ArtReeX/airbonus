/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.get = function (socket, params, methods, database, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод airports_get с параметрами: " + params);
    
    methods.airports.getByLine(params, database, function (result_error, result_data) {

        // формирование пакета для отправки
        var message = {
            "error": result_error,
            "data": { "airports": result_data }
        };
        
        // отправка результата
        log.trace("Отправка результата airports_get методом airports_get пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("airports_get", message);

    });
    
};

module.exports.set = function (socket, params, methods, database, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод airports_set с параметрами: " + params);
    
    // переменные для хранения
    var message, airports = [], airports_count;
    
    methods.getAirports.getAll(params, database, function (result_error, result_data) {

        if (result_error) {
            
            // формирование пакета для отправки
            message = {
                "error": result_error,
                "data": null
            };

        } else {
            
            // перезапись IATA-кодов а массив
            for (airports_count = 0; airports_count < result_data.airports.length; airports_count += 1) {
                airports.push(result_data.airports[airports_count].iata);
            }
            
            // ОБРАБОТКА ОТВЕТОВ
            
            if (airports.indexOf(String(params.from)) === -1 || airports.indexOf(String(params.to)) === -1) {
                
                // формирование пакета для отправки
                message = {
                    "error": "no_exist_airport",
                    "data": null
                };
                
            } else if (String(params.from) === String(params.to)) {
                
                // формирование пакета для отправки
                message = {
                    "error": "same_airports",
                    "data": null
                };
                
            } else {
                
                socket.session.userAirportFrom = String(params.from);
                socket.session.userAirportTo = String(params.to);
                
                // формирование пакета для отправки
                message = {
                    "error": null,
                    "data": { "next": true }
                };
            }

        }
        
        // отправка результата
        log.trace("Отправка результата airports_set методом airports_set пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("airports_set", message);

    });
    
};
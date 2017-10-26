/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports = function (params, methods, socket, database, log) {
    
    "use strict";
    
    methods.getAirports(params, database, function (result) {

        if (result.error) {

            // ОБРАБОТКА ОШИБОК

            // отправка результата
            log.trace("Sending method resultSetAirports results to " + socket.id + ":");
            log.trace({
                "error": {
                    "type": result.error.type
                },
                "data": null
            });

            socket.emit("resultSetAirports", {
                "error": {
                    "type": result.error.type
                },
                "data": null
            });

        } else {
            
            // перезапись IATA-кодов а массив
            var airports = [], airports_count;
            for (airports_count = 0; airports_count < result.data.airports.length; airports_count += 1) {
                airports.push(result.data.airports[airports_count].iata);
            }
            
            // ОБРАБОТКА ОТВЕТОВ
            
            if (airports.indexOf(String(params.from)) === -1 || airports.indexOf(String(params.to)) === -1) {
                
                // отправка результата
                log.trace("Sending method resultSetAirports results to " + socket.id + ":");
                log.trace({
                    "error": {
                        "type": "no_exist_airport"
                    },
                    "data": null
                });

                socket.emit("resultSetAirports", {
                    "error": {
                        "type": "no_exist_airport"
                    },
                    "data": null
                });
                
            } else if (String(params.from) === String(params.to)) {
                
                // отправка результата
                log.trace("Sending method resultSetAirports results to " + socket.id + ":");
                log.trace({
                    "error": {
                        "type": "no_exist_airport"
                    },
                    "data": null
                });

                socket.emit("resultSetAirports", {
                    "error": {
                        "type": "same_airports"
                    },
                    "data": null
                });
                
            } else {
                
                socket.session.userAirportFrom = String(params.from);
                socket.session.userAirportTo = String(params.to);
                
                // отправка результата
                log.trace("Sending method resultSetAirports results to " + socket.id + ":");
                log.trace({
                    "error": null,
                    "data": {
                        "next": true
                    }
                });

                socket.emit("resultSetAirports", {
                    "error": null,
                    "data": { "next": true }
                });
    
            }

        }

    });
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод setAirports с параметрами: " + params);
    
};
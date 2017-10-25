/*globals require, module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports = function (params, methods, socket, database, log) {
    
    "use strict";
    
    socket.session.userAirportFrom = String(params.airport);
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод setAirportsFrom с параметрами: " + params);
    
};
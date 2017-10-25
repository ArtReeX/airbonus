/*globals require, module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports = function (params, methods, socket, database, log) {
    
    "use strict";
    
    socket.session.userAirportTo = String(params.airport);
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод setAirportsTo с параметрами: " + params);
    
};
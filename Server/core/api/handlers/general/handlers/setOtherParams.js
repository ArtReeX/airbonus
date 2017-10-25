/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports = function (params, methods, socket, database, log) {
    
    "use strict";
    
    socket.session.statusValue = Number(params.statusValue);
    socket.session.minPeople = Number(params.minPeople);
    socket.session.maxPeople = Number(params.maxPeople);
    socket.session.spendNextMonth = Number(params.spendNextMonth);
    socket.session.spendNextYear = Number(params.spendNextYear);
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод setOtherParams с параметрами: " + params);
    
};
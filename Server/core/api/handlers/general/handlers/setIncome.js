/*globals require, module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports = function (params, methods, socket, database, log) {
    
    "use strict";
    
    socket.session.incomeMin = Number(params.min);
    socket.session.incomeMax = Number(params.max);
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод setIncome с параметрами: " + params);
    
};
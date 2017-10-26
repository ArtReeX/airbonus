/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.set = function (socket, params, methods, log) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод others_set параметрами: " + params);
    
    socket.session.statusValue = Number(params.statusValue);
    socket.session.minPeople = Number(params.minPeople);
    socket.session.maxPeople = Number(params.maxPeople);
    socket.session.spendNextMonth = Number(params.spendNextMonth);
    socket.session.spendNextYear = Number(params.spendNextYear);
    
    // формирование пакета для отправки
    var message = {
        "error": null,
        "data": { "next": true }
    };
    
    // отправка результата
    log.trace("Отправка результата others_set методом others_set пользователю " + socket.id + ":");
    log.trace(message);

    socket.emit("others_set", message);
    
};
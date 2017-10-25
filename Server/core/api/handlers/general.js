/*globals require, module*/

/*----------- ЗАГОЛОВКИ -----------*/
var handlers_module = require("./general/handlers"),
    methods_module = require("./general/methods");


/*---------------------------- ОСНОВНЫЕ ОБРАБОТЧИКИ -------------------------------*/
module.exports.set = function (socket, database, log, async, callback) {
    
    "use strict";
    
    // запрос начальных аэропортов
    socket.on("getAirportsFrom", function (line) {
        
        handlers_module.getAirportsFrom({
            "line" : String(line)
        }, methods_module, socket, database, log);
        
    });
    
    // запрос конечных аэропортов
    socket.on("getAirportsTo", function (line) {
        
        handlers_module.getAirportsTo({
            "line" : String(line)
        }, methods_module, socket, database, log);
        
    });
    
    // установка начального аэропорта
    socket.on("setAirportFrom", function (airport) {
        
        handlers_module.setAirportFrom({
            "airport" : String(airport)
        }, methods_module, socket, database, log);
        
    });
    
    // установка конечного аэропорта
    socket.on("setAirportTo", function (airport) {
        
        handlers_module.setAirportTo({
            "airport" : String(airport)
        }, methods_module, socket, database, log);
        
    });
    
    // запрос авиалиний
    socket.on("getAirlines", function (to, from) {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод getAirlines с параметрами: " + to + "," + from);
        
        handlers_module.getAirlines({
            "to" : String(to),
            "from" : String(from)
        }, methods_module, socket, database, log);
        
    });
    
    // запрос кредитного рейтинга
    socket.on("getCreditScore", function () {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод getCreditScore");
        
        handlers_module.getCreditScore(null, methods_module, socket, database, log);
        
    });
    
    // установка кредитного рейтинга
    socket.on("setCreditScore", function (min, max) {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод setCreditScore с параметрами: " + min + "," + max);
        
        handlers_module.setCreditScore({
            "min" : Number(min),
            "max" : Number(max)
        }, methods_module, socket, database, log);
        
    });
    
    // запрос дохода
    socket.on("getIncome", function () {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод getIncome");
        
        handlers_module.getCreditScore(null, methods_module, socket, database, log);
        
    });
    
    // установка дохода
    socket.on("setIncome", function (min, max) {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод setIncome с параметрами: " + min + "," + max);
        
        handlers_module.setIncome({
            "min" : Number(min),
            "max" : Number(max)
        }, methods_module, socket, database, log);
        
    });
    
    // установка карт пользователя
    socket.on("setCardCount", function (count) {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод setCardCount с параметрами: " + count);
        
        handlers_module.setCardCount({
            "count" : Number(count)
        }, methods_module, socket, database, log);
        
    });
    
    // запрос семейного положения
    socket.on("getMaritalStatus", function () {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод getMaritalStatus");
        
        handlers_module.getMaritalStatus(null, methods_module, socket, database, log);
        
    });
    
    // запрос всех карт
    socket.on("getAllCard", function () {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод getAllCard");
        
        handlers_module.getAllCard(null, methods_module, socket, database, log);
        
    });
    
    // установка количества карт
    socket.on("setAllCards", function (cards) {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод setAllCards с параметрами: " + cards);
        
        handlers_module.setAllCards({
            "cards" : cards
        }, methods_module, socket, database, log);
        
    });
    
    // запрос всех карт AmericanExpress
    socket.on("getAmExCard", function () {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод getAmExCard");
        
        handlers_module.getAmExCard(null, methods_module, socket, database, log);
        
    });
    
    // установка карт AmericanExpress
    socket.on("setAmExCard", function (cards) {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод setAmExCard с параметрами: " + cards);
        
        handlers_module.setAmExCard({
            "cards" : cards
        }, methods_module, socket, database, log);
        
    });
    
    // установка дополнительных данных
    socket.on("setOtherParams", function (params) {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод setOtherParams с параметрами: " + params);
        
        handlers_module.setOtherParams({
            "params" : params
        }, methods_module, socket, database, log);
        
    });
    
    // запрос расчитаных данных
    socket.on("getCalculatedData", function () {

        // запись сообщения клиента в отладку
        log.info("Пользователь " + socket.id + " вызвал метод getCalculatedData");
        
        handlers_module.getCalculatedData(null, methods_module, socket, database, log);
        
    });
    
    callback(null);
    
};
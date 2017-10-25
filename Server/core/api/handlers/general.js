/*globals require, module*/

/*----------- ЗАГОЛОВКИ -----------*/
var handlers_module = require("./general/handlers"),
    methods_module = require("./general/methods");


/*---------------------------- ОСНОВНЫЕ ОБРАБОТЧИКИ -------------------------------*/
module.exports.set = function (config, socket, database, log, async, callback) {
    
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
    
    // установка начального и конечного аэропорта
    socket.on("setAirports", function (from, to) {
        
        handlers_module.setAirports({
            "from" : String(from),
            "to" : String(to)
        }, methods_module, socket, database, log);
        
    });
    
    // запрос авиалиний
    socket.on("getAirlines", function (to, from) {
        
        handlers_module.getAirlines({
            "to" : String(to),
            "from" : String(from)
        }, methods_module, socket, database, log);
        
    });
    
    // запрос кредитного рейтинга
    socket.on("getCreditScores", function () {

        handlers_module.getCreditScore(null, methods_module, socket, database, log);
        
    });
    
    // установка кредитного рейтинга
    socket.on("setCreditScores", function (min, max) {
        
        handlers_module.setCreditScore({
            "min" : Number(min),
            "max" : Number(max)
        }, methods_module, socket, database, log);
        
    });
    
    // запрос дохода
    socket.on("getIncomes", function () {
        
        handlers_module.getCreditScore(null, methods_module, socket, database, log);
        
    });
    
    // установка дохода
    socket.on("setIncomes", function (min, max) {
        
        handlers_module.setIncome({
            "min" : Number(min),
            "max" : Number(max)
        }, methods_module, socket, database, log);
        
    });
    
    // установка карт пользователя
    socket.on("setCardCount", function (count) {

        handlers_module.setCardCount({
            "count" : Number(count)
        }, methods_module, socket, database, log);
        
    });
    
    // запрос семейного положения
    socket.on("getMaritalStatus", function () {
        
        handlers_module.getMaritalStatus(null, methods_module, socket, database, log);
        
    });
    
    // запрос всех карт
    socket.on("getAllCard", function () {

        handlers_module.getAllCard(null, methods_module, socket, database, log);
        
    });
    
    // установка количества карт
    socket.on("setAllCards", function (cards) {

        handlers_module.setAllCards({
            "cards" : cards
        }, methods_module, socket, database, log);
        
    });
    
    // запрос всех карт AmericanExpress
    socket.on("getAmExCards", function () {
        
        handlers_module.getAmExCard(null, methods_module, socket, database, log);
        
    });
    
    // установка карт AmericanExpress
    socket.on("setAmExCards", function (cards) {

        handlers_module.setAmExCard({
            "cards" : cards
        }, methods_module, socket, database, log);
        
    });
    
    // установка дополнительных данных
    socket.on("setOtherParams", function (params) {

        handlers_module.setOtherParams({
            "params" : params
        }, methods_module, socket, database, log);
        
    });
    
    // запрос расчитаных данных
    socket.on("getCalculatedData", function () {

        handlers_module.getCalculatedData(config, socket.session, methods_module, socket, database, log, async);
        
    });
    
    callback(null);
    
};
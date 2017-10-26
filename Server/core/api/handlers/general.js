/*globals require, module*/

/*----------- ЗАГОЛОВКИ -----------*/
var handlers_module = require("./general/handlers"),
    methods_module = require("./general/methods");


/*---------------------------- ОСНОВНЫЕ ОБРАБОТЧИКИ -------------------------------*/
module.exports.set = function (config, socket, database, log, async, callback) {
    
    "use strict";
    
    // получение констант
    async.parallel([
        
        function (done) {
            
            methods_module.consts.incomeMin(database, function (error, value) {
                
                if (error) { done(error); } else {
                    socket.session.consts.incomeMin = Number(value);
                    done();
                }
                
            });
            
        },
        
        function (done) {
            
            methods_module.consts.creditMin(database, function (error, value) {
                
                if (error) { done(error); } else {
                    socket.session.consts.creditMin = Number(value);
                    done();
                }
                
            });
            
        }
        
    ], function (error) {
        
        if (error) {
            
            log.error(error);
            log.error("Не удалось загрузить константы для пользователя " + socket.id + ".");
            
        } else {
            
            // запрос начальных аэропортов
            socket.on("airports_get_from", function (line) {

                handlers_module.airports.getFrom(socket, {
                    "line" : String(line)
                }, methods_module, database, log);

            });
            
            // запрос конечных аэропортов
            socket.on("airports_get_to", function (line) {

                handlers_module.airports.getTo(socket, {
                    "line" : String(line)
                }, methods_module, database, log);

            });

            // установка начального и конечного аэропорта
            socket.on("airports_set", function (from, to) {

                handlers_module.airports.set(socket, {
                    "from" : String(from),
                    "to" : String(to)
                }, methods_module, database, log);

            });

            // запрос авиалиний
            socket.on("airlines_get", function () {

                handlers_module.airlines.get(socket, methods_module, database, log);

            });

            // запрос кредитного рейтинга
            socket.on("scores_get", function () {

                handlers_module.scores.get(socket, methods_module, database, log);

            });

            // установка кредитного рейтинга
            socket.on("scores_set", function (id) {

                handlers_module.scores.set(socket, { "id" : Number(id) }, methods_module, database, log);

            });

            // запрос дохода
            socket.on("incomes_get", function () {

                handlers_module.incomes.get(socket, methods_module, database, log);

            });

            // установка дохода
            socket.on("incomes_set", function (id) {

                handlers_module.incomes.set(socket, { "id": Number(id) }, methods_module, database, log);

            });

            // запрос семейного положения
            socket.on("statuses_get", function () {

                handlers_module.statuses.get(socket, methods_module, database, log);

            });

            // запрос всех карт
            socket.on("cards_get_all", function () {

                handlers_module.cards.get.all(socket, methods_module, database, log);

            });

            // установка количества карт
            socket.on("cards_set_all", function (cards) {

                handlers_module.cards.set.all(socket, { "cards" : cards }, methods_module, log);

            });

            // запрос всех карт AmericanExpress
            socket.on("cards_get_amEx", function () {

                handlers_module.cards.get.amEx(socket, methods_module, database, log);

            });

            // установка карт AmericanExpress
            socket.on("cards_set_amEx", function (cards) {

                handlers_module.set.amEx(socket, { "cards" : cards }, methods_module, log);

            });

            // установка дополнительных данных
            socket.on("others_set", function (params) {

                handlers_module.others.set(socket, { "params" : params }, methods_module, database, log);

            });

            // запрос расчитаных данных
            socket.on("calculated_get", function () {

                handlers_module.calculated.get(socket, config, methods_module, socket, database, log, async);

            });
            
        }
        
    });
    
    callback(null);
    
};
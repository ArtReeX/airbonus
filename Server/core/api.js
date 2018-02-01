/*globals require, module*/

/*----------- ЗАГОЛОВКИ -----------*/
var handlers_module = require("./api/handlers"),
    parameters_module = require("./api/parameters");

/*---------------------------- API-ОБРАБОТЧИКИ -------------------------------*/
module.exports.set = function(
    config,
    websocket,
    database,
    log,
    async,
    callback
) {
    "use strict";

    var socket;

    websocket.sockets.on("connection", function(socket_client) {
        // логгирование
        log.info(
            "Пользователь " +
                socket_client.id +
                ", IP: " +
                socket_client.request.connection.remoteAddress +
                " подключился."
        );

        async.parallel([
            // установка обработчиков стандартных событий
            function(done) {
                handlers_module.standart.set(
                    socket_client,
                    log,
                    async,
                    function(error) {
                        if (error) {
                            done(error);
                        } else {
                            socket_client.session = JSON.parse(
                                JSON.stringify(parameters_module)
                            );
                            done();
                        }
                    }
                );
            },

            // установка обработчиков клиентских событий
            function(done) {
                handlers_module.general.set(
                    config,
                    socket_client,
                    database,
                    log,
                    async,
                    function(error) {
                        if (error) {
                            done(error);
                        } else {
                            done();
                        }
                    }
                );
            }
        ]);
    });

    callback(null);
};

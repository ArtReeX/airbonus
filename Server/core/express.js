/*globals require, module*/

/*----------- ЗАГОЛОВКИ -----------*/
var http_module = require("http");
var express_module = require("express");

/*---------------------------- EXPRESS-СЕРВЕР -------------------------------*/
module.exports.create = function(config, callback) {
    "use strict";

    var express = express_module(),
        app = http_module.createServer(express);

    // открытие доступа извне к директории на сервере
    express.use(express_module["static"](config.files_directory));

    // начало прослушивание порта
    app.listen(config.port, function(error) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, app);
        }
    });
};

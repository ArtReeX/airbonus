/*global require, module*/

/*----------- ЗАГОЛОВКИ -----------*/
var io_module = require("socket.io");

/*-------------------------- WEBSOKET-СЕРВЕР -----------------------------*/
module.exports.create = function (config, app, callback) {
    
    "use strict";

    var io_serv = io_module.listen(app, config.websocket);
        
    callback(null, io_serv);

};

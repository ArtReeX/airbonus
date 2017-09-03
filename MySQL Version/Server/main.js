/*-------------- ЗАГОЛОВКИ ------------------*/
/*global require*/
var ws_module = require('./core/ws');
var log_module = require('./core/log');


/*-------------- LOG ------------------*/
var log = log_module.Log();


/*-------------- СОЗДАНИЕ WS-СЕРВЕРА ------------------*/
var ws_server = ws_module.WS(function (error) {
    'use strict';

    if (!error) {
        log.info("The WS-part is successfully started.");
    } else {
        log.fatal("It is not possible to run the WS-part.");
    }
});

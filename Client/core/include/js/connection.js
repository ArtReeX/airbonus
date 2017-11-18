/************************ СКРИПТЫ СОЕДИНЕНИЙ ************************/
/*globals $, document, window, io, showPageAirports, showPageError*/

$(document).ready(function () {
    
    'use strict';
    
    // подключение к серверу, если его нет
    if (typeof window.socket === "undefined") {

        window.socket = io.connect("ws://" + String(window.config.server.address) + ":" +  String(window.config.server.port), {
            reconnection: true
        });

    }
    
    // обработчик отсутствия соединения с сервером
    window.socket.off("connect_error").on("connect_error", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier !== "error") {

            // выполняем редирект на страницу ошибок
            showPageError("connect_server");

        }

    });

});
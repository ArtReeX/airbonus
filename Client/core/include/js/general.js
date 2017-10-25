/************************ ОБРАБОЧИКИ ПОСТОЯННЫХ ЭЛЕМЕНТОВ ************************/
/*globals $, document, window, io, showPageIndex, showPageError*/

$(document).ready(function () {
    
    'use strict';
    
    // показ основной страницы
    showPageIndex();
    
    // подключение к серверу, если его нет
    if (typeof window.socket === "undefined") {

        window.socket = io.connect('ws://localhost:8181', {
            reconnection: true
        });

    }
    
    // обработчик отсутствия соединения с сервером
    window.socket.on('connect_error', function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier !== "error") {

            // выполняем редирект на страницу ошибок
            showPageError("connect_server");

        }

    });

});
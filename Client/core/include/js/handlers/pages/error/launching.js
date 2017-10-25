/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document, window, showPageIndex, setTimeout*/

$(document).ready(function () {

    'use strict';
    
    // - определение типа ошибки
    if (window.errorType === "connect_server") {

        $('#error-head b').text("Server connection error");
        $('#error-subHead p').text("- you will be redirected to the main page when the connection is restored");

        // действие после восстановления подключения
        window.socket.on('connect', function () {

            // проверка соответствие обработчика со страницей
            if (window.identifier === "error") {

                // выполняем редирект на главную страницу
                showPageIndex();

            }

        });

        return;
        
    } else if (window.errorType === "page_exist") {

        $('#error-head b').text("Page not found");
        $('#error-subHead p').text("- you will be redirected to the main page after 10 seconds");

        // переподключение через N секунд
        setTimeout(function () {

            showPageIndex();

        }, 10000);

        return;
    }

});
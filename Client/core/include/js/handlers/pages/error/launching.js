/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document, window, showPageIndex, setTimeout*/

$(document).ready(function () {

    'use strict';
    
    // - определение типа ошибки
    if (window.errorType === "connect_server") {

        /*globals $*/
        $('#error-head b').text("Ошибка подключения к серверу");
        $('#error-subHead p').text("- вы будете перенаправлены на главную страницу когда соединение будет восстановлено");

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

        /*globals $*/
        $('#error-head b').text("Страница не найдена");
        $('#error-subHead p').text("- вы будете перенаправлены на главную страницу через 10 секунд");

        // переподключение через N секунд
        setTimeout(function () {

            showPageIndex();

        }, 10000);

        return;
    }

});
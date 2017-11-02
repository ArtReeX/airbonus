/************************ ПРЕДЗАГРУЗЧИК ************************/
/*globals $, document, window, showPagePreloader, showPageError, setTimeout*/

function showPageError(errorType) { // eslint-disable-line no-unused-vars

    'use strict';
    
    $(document).ready(function () {

        // показ прелоадера
        showPagePreloader();

        // установка задержки прелоадера
        setTimeout(function () {

            // отправка запроса на получение содержимого страницы
            $.ajax({

                url: "/core/include/php/pages/error.php",

                dataType: "html",

                cache: true,

                async: false,

                success: function (html) {

                    // идентификация страницы
                    window.identifierPrevious = window.identifier;
                    window.identifier = "error";

                    // установка типа ошибки
                    window.errorType = errorType;

                    // скрытие страницы
                    $("#loaded").hide();

                    // загрузка HTML-содержимого страницы
                    $("#loaded").html(html);

                    // загрузка JS-содержимого страницы
                    $.getScript("/core/include/js/handlers/pages/error/network.js");
                    $.getScript("/core/include/js/handlers/pages/error/interface.js");
                    $.getScript("/core/include/js/handlers/pages/error/launching.js");
                    
                    // показ страницы
                    $("#loaded").show();

                },

                error: function () {

                    // показ страницы с ошибкой
                    showPageError("page_exist");

                }

            });

        }, 600);

    });

}
/************************ ПРЕДЗАГРУЗЧИК ************************/
/*globals $, document, window, showPagePreloader, showPageError*/

function showPagePreloader(errorType) { // eslint-disable-line no-unused-vars

    'use strict';
    
    $(document).ready(function () {

        // отправка запроса на получение содержимого страницы
        $.ajax({

            url: "/core/include/php/pages/preloader.php",

            dataType: "html",

            cache: true,

            async: true,

            success: function (html) {

                // идентификация страницы
                window.identifierPrevious = window.identifier;
                window.identifier = "preloader";

                // установка типа ошибки
                window.errorType = errorType;

                // скрытие страницы
                $("#loaded").hide();

                // загрузка HTML-содержимого страницы
                $("#loaded").html(html);

                // показ страницы
                $("#loaded").show();

            },

            error: function () {

                // показ страницы с ошибкой
                showPageError("page_exist");

            }

        });

    });

}
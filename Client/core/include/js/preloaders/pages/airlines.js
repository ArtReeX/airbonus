/************************ ПРЕДЗАГРУЗЧИК ************************/
/*globals $, document, window, showPagePreloader, showPageError, setTimeout*/

function showPageAirlines() {

    'use strict';
    
    $(document).ready(function () {

        // показ прелоадера
        showPagePreloader();

        // установка задержки прелоадера
        setTimeout(function () {

            // отправка запроса на получение содержимого страницы
            $.ajax({

                url: "/core/include/php/pages/airlines.php",

                dataType: "html",

                async: true,

                success: function (html) {

                    // идентификация страницы
                    window.identifierPrevious = window.identifier;
                    window.identifier = "airlines";

                    // скрытие страницы
                    $("#loaded").hide();

                    // загрузка HTML-содержимого страницы
                    $("#loaded").html(html);

                    // показ страницы
                    $("#loaded").show();

                    // загрузка JS-содержимого страницы
                    $.getScript("/core/include/js/handlers/pages/airlines/network.js");
                    $.getScript("/core/include/js/handlers/pages/airlines/interface.js");
                    $.getScript("/core/include/js/handlers/pages/airlines/launching.js");

                },

                error: function () {

                    // показ страницы с ошибкой
                    showPageError("page_exist");

                }

            });

        }, 600);

    });

}
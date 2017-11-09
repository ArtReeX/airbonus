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

                url: "/core/include/html/pages/airlines.html",

                dataType: "html",

                cache: true,

                async: false,

                success: function (html) {

                    // идентификация страницы
                    window.identifierPrevious = window.identifier;
                    window.identifier = "airlines";

                    // скрытие страницы
                    $("#loaded").hide();

                    // загрузка HTML-содержимого страницы
                    $("#loaded").html(html);

                    // загрузка JS-содержимого страницы
                    $.getScript("/core/include/js/handlers/pages/airlines/network.js").fail(function () { showPageError("scripts_exist"); });
                    $.getScript("/core/include/js/handlers/pages/airlines/interface.js").fail(function () { showPageError("scripts_exist"); });
                    $.getScript("/core/include/js/handlers/pages/airlines/launching.js").fail(function () { showPageError("scripts_exist"); });
                    
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
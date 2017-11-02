/************************ ПРЕДЗАГРУЗЧИК ************************/
/*globals $, document, window, showPagePreloader, showPageError, setTimeout*/

function showPageOthers() {

    'use strict';
    
    $(document).ready(function () {

        // показ прелоадера
        showPagePreloader();

        // установка задержки прелоадера
        setTimeout(function () {

            // отправка запроса на получение содержимого страницы
            $.ajax({

                url: "/core/include/php/pages/others.php",

                dataType: "html",

                cache: true,

                async: false,

                success: function (html) {

                    // идентификация страницы
                    window.identifierPrevious = window.identifier;
                    window.identifier = "others";

                    // скрытие страницы
                    $("#loaded").hide();

                    // загрузка HTML-содержимого страницы
                    $("#loaded").html(html);

                    // загрузка JS-содержимого страницы
                    $.getScript("/core/include/js/handlers/pages/others/network.js").fail(function () { showPageError("scripts_exist"); });
                    $.getScript("/core/include/js/handlers/pages/others/interface.js").fail(function () { showPageError("scripts_exist"); });
                    $.getScript("/core/include/js/handlers/pages/others/launching.js").fail(function () { showPageError("scripts_exist"); });
                    
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
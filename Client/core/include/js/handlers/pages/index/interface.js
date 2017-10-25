/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageAuthorization, showPageRegistration*/

$(document).ready(function () {

    'use strict';

    // обработчик нажатия кнопки входа
    $("#loaded").off("click", "#index-button-login").on("click", "#index-button-login", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "index") {

            // редирект на страницу входа
            showPageAuthorization();

        }

    });

    // обработчик нажатия кнопки регистрации
    $("#loaded").off("click", "#index-button-reg").on("click", "#index-button-reg", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "index") {

            // редирект на страницу входа
            showPageRegistration();

        }

    });

});
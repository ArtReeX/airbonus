/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageOthers*/

$(document).ready(function () {

    'use strict';

    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded").off("click", "#computation-button_goto_back").on("click", "#computation-button_goto_back", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "computation") { showPageOthers(); }

    });

});
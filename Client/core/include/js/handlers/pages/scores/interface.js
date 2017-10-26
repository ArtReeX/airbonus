/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageAirlines, showPageCardsAll*/

$(document).ready(function () {

    'use strict';

    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded").off("click", "#scores-button_goto_back").on("click", "#scores-button_goto_back", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "scores") { showPageAirlines(); }

    });
    
    // обработчик нажатия кнопки для перехода на следующую страницу
    $("#loaded").off("click", "#scores-button_goto_next").on("click", "#scores-button_goto_next", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "scores") {  window.socket.emit("scores_set", Number($("#scores-list").children(":selected").val())); }

    });

});
/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageScores*/

$(document).ready(function () {

    'use strict';

    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded").off("click", "#incomes-button_goto_back").on("click", "#incomes-button_goto_back", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "incomes") { showPageScores(); }

    });
    
    // обработчик нажатия кнопки для перехода на следующую страницу
    $("#loaded").off("click", "#incomes-button_goto_next").on("click", "#incomes-button_goto_next", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "incomes") {  window.socket.emit("incomes_set", Number($("#incomes-list").children(":selected").val())); }

    });

});
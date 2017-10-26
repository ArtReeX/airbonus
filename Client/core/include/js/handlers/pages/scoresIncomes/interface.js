/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageAirlines, showPageCardsAll*/

$(document).ready(function () {

    'use strict';

    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded").off("click", "#scoresIncomes-button_goto_back").on("click", "#scoresIncomes-button_goto_back", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "scoresIncomes") {
            
            showPageAirlines();

        }

    });
    
    // обработчик нажатия кнопки для перехода на следующую страницу
    $("#loaded").off("click", "#scoresIncomes-button_goto_next").on("click", "#scoresIncomes-button_goto_next", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "scoresIncomes") {  showPageCardsAll(); }

    });

});
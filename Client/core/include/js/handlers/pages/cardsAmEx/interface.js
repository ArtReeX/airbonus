/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageCardsAll*/

$(document).ready(function () {

    'use strict';

    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded").off("click", "#cardsAmEx-button_goto_back").on("click", "#cardsAmEx-button_goto_back", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "cardsAmEx") { showPageCardsAll(); }

    });
    
    // обработчик нажатия кнопки для перехода на следующую страницу
    $("#loaded").off("click", "#cardsAmEx-button_goto_next").on("click", "#cardsAmEx-button_goto_next", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "cardsAmEx") {
            
            var selected_cards = [];
            $("#cardsAmEx-table > div").each(function (count, element) {
                
                // добавление только тех карт, для которых введено количество бонусов и стоит галочка активности
                if ($(element).find(".cardsAmEx-table_card_have").is(":checked")) {
                    
                    selected_cards.push(Number($(element).attr("value").trim()));

                }
                
            });

            window.socket.emit("cards_set_amEx", selected_cards);
        }

    });

});
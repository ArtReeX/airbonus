/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageIncomes*/

$(document).ready(function () {

    'use strict';

    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded").off("click", "#cardsAll-button_goto_back").on("click", "#cardsAll-button_goto_back", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "cardsAll") { showPageIncomes(); }

    });
    
    // обработчик нажатия кнопки для перехода на следующую страницу
    $("#loaded").off("click", "#cardsAll-button_goto_next").on("click", "#cardsAll-button_goto_next", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "cardsAll") {
            
            var cards_count, selected_cards = [];
            for (cards_count = 0; cards_count < $("#cardsAll-table tr").length; cards_count += 1) {

                // добавление только тех карт, для которых введено количество бонусов и стоит галочка активности
                if ($($("#cardsAll-table tr")[cards_count]).find(".cardsAll-table_card_have").is(":checked") &&
                        Number($($("#cardsAll-table tr")[cards_count]).find(".cardsAll-table_card_mile").val().trim()) >= 0) {
                    
                    selected_cards.push({
                        "card": Number($($("#cardsAll-table tr")[cards_count]).attr("value").trim()),
                        "bonus": Number($($("#cardsAll-table tr")[cards_count]).find(".cardsAll-table_card_mile").val().trim())
                    });

                }
            }

            window.socket.emit("cards_set_all", selected_cards);
        }

    });

});
/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, showPageCardsAmEx*/

$(document).ready(function () {

    'use strict';
    
    // обработка приёма списка всех карт
    window.socket.off("cards_get_all").on("cards_get_all", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "cardsAll") {

            // очистка таблицы с картами
            $("#cardsAll-table").empty();

            if (result.data.cards.length) {

                var cards_count;
                for (cards_count = 0; cards_count < result.data.cards.length; cards_count += 1) {
                    
                    $("#cardsAll-table").append("<tr value=" + String(result.data.cards[cards_count].id) + ">" +
                                                    "<td>" + String(result.data.cards[cards_count].name) + "</td>" +
                                                    "<td> <img src='http://" +
                                                    String(window.config.server.address) + ":" + String(window.config.server.port) +
                                                    "/client/images/cards/" +
                                                    String(result.data.cards[cards_count].image) + "'> </td>" +
                                                    "<td> <input type='checkbox' class='cardsAll-table_card_have form-check-input'> </td>" +
                                                    "<td> <input type='number' class='cardsAll-table_card_mile form-control bg-light text-center text-black'> </td>" +
                                                "</tr>");
                    
                }
                
            }
            
            // показ обработанного содержимого
            $("#cardsAll-table").show();

        }

    });
    
    // обработчик получения ответа о правильности данных от сервера
    window.socket.off("cards_set_all").on("cards_set_all", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "cardsAll") {

            if (result.error) {

                // ОБРАБОТКА ОШИБОК

                if (result.error.type === "database") {

                    // показываем ошибку
                    $("#cardsAll-info_danger_block").show();
                    $("#cardsAll-info_danger").text("Database error.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#cardsAll-info_danger_block").hide();
                        $("#cardsAll-info_danger").empty().hide();
                    }, 2000);

                }

            } else {

                // ОБРАБОТКА ОТВЕТОВ

                if (Boolean(result.data.next) === true) { showPageCardsAmEx(); }

            }

        }

    });
    
});
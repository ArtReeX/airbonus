/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, showPageCardsAmEx*/

$(document).ready(function () {

    'use strict';
    
    // обработка приёма списка всех карт
    window.socket.on("cards_get_all", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "cardsAll") {

            // очистка таблицы с картами
            $("#cardsAll-table").empty();

            if (result.data.cards.length) {

                var cards_count;
                for (cards_count = 0; cards_count < result.data.cards.length; cards_count += 1) {
                    
                    $("#cardsAll-table").append("<tr value=" + String(result.data.cards[cards_count].id) + ">" +
                                                    "<th scope='row'>" + String(result.data.cards[cards_count].name) + "</th>" +
                                                    "<td> <img src='http://" +
                                                    String(window.config.server.address) + ":" + String(window.config.server.port) +
                                                    "/client/images/cards/" +
                                                    String(result.data.cards[cards_count].image) + "'> </td>" +
                                                    "<td> <input type='number' class='form-control bg-light text-center text-black'> </td>" +
                                                "</tr>");
                    
                }
                
            }

        }

    });
    
    // обработчик получения ответа о правильности данных от сервера
    window.socket.on("cards_set_all", function (result) {

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
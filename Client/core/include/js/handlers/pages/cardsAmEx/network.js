/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, showPageOthers*/

$(document).ready(function () {

    'use strict';
    
    // обработка приёма списка всех карт
    window.socket.on("cards_get_amEx", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "cardsAmEx") {

            // очистка таблицы с картами
            $("#cardsAmEx-table").empty();

            if (result.data.cards.length) {

                var cards_count;
                for (cards_count = 0; cards_count < result.data.cards.length; cards_count += 1) {
                    
                    $("#cardsAmEx-table").append("<tr value=" + String(result.data.cards[cards_count].id) + ">" +
                                                    "<td>" + String(result.data.cards[cards_count].name) + "</td>" +
                                                    "<td> <img src='http://" +
                                                    String(window.config.server.address) + ":" + String(window.config.server.port) +
                                                    "/client/images/cards/" +
                                                    String(result.data.cards[cards_count].image) + "'> </td>" +
                                                    "<td> <input type='number' class='form-control bg-light text-center text-black'> </td>" +
                                                "</tr>");
                    
                }
                
            }
            
            // показ обработанного содержимого
            $("#cardsAmEx-table").show();

        }

    });
    
    // обработчик получения ответа о правильности данных от сервера
    window.socket.on("cards_set_amEx", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "cardsAmEx") {

            if (result.error) {

                // ОБРАБОТКА ОШИБОК

                if (result.error.type === "database") {

                    // показываем ошибку
                    $("#cardsAmEx-info_danger_block").show();
                    $("#cardsAmEx-info_danger").text("Database error.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#cardsAmEx-info_danger_block").hide();
                        $("#cardsAmEx-info_danger").empty().hide();
                    }, 2000);

                }

            } else {

                // ОБРАБОТКА ОТВЕТОВ

                if (Boolean(result.data.next) === true) { showPageOthers(); }

            }

        }

    });
    
});
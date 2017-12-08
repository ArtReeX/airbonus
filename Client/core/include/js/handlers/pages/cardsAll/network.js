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
                    
                    $("#cardsAll-table").append("<div class='col-12 col-lg-6' value=" + String(result.data.cards[cards_count].id) + ">" +
                                                
                                                    "<div class='card mb-3 bg-content border-primary text-white'>" +
                                                        
                                                        "<div class='card-header lead'>" + String(result.data.cards[cards_count].name) + "</div>" +
                                                    
                                                        "<div class='card-body'>" +
                                                            
                                                            "<div class='container-fluid'>" +
                                                                
                                                                    "<div class='row justify-content-center'>" +
                                                                
                                                                            "<div class='col-12 col-md-6'>" +
                                                                
                                                                                "<img class='img-fluid cardsAll-table img' src='http://" +
                                                                                String(window.config.server.address) + ":" + String(window.config.server.port) +
                                                                                "/client/images/cards/" +
                                                                                String(result.data.cards[cards_count].image) + "'>" +
                                                
                                                                            "</div>" +
                                                
                                                                            "<div class='col-12 col-md-6 mt-4'>" +
                                                
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-4 col-md-12 m-0 p-0'>" +

                                                                                        "<div class='form-group row justify-content-center m-0 p-0'>" +

                                                                                            "<div class='col-7 m-0 p-0'> Have: </div>" +

                                                                                            "<div class='col-4 m-0 p-0 ml-1'>" +
                                                                                            "<input type='checkbox' class='input-checkbox cardsAll-table_card_have'>" +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +

                                                                                    "<div class='col-8 col-md-12 m-0 p-0'>" +

                                                                                         "<div class='form-group row justify-content-center m-0 p-0'>" +

                                                                                            "<div class='col-7 m-0 p-0'> Mile: </div>" +

                                                                                            "<div class='col-4 m-0 p-0 ml-1'>" +
                                                                                            "<input type='number' class='input-form cardsAll-table_card_mile form-control bg-light text-left text-black'>" +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                
                                                                            "</div>" +
                                                
                                                                    "</div>" +
                                                
                                                            "</div>" +
                                                
                                                        "</div>" +
                                                
                                                    "</div>" +
                                                
                                                "<div>");
                    
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
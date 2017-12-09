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

                result.data.cards.forEach(function (card) {
                    
                    $("#cardsAll-table").append("<div class='col-12 col-lg-6' value=" + String(card.id) + ">" +
                                                
                                                    "<div class='card mb-3 bg-content border-primary text-white'>" +
                                                        
                                                        "<div class='card-header'>" +
                                                
                                                            "<div class='container-fluid'>" +
                                                
                                                                "<div class='row'>" +
                                                                
                                                                    "<div class='col-10 col-lg-12 lead'>" +
                                                
                                                                        String(card.name) +
                                                
                                                                    "</div>" +
                                                
                                                                    "<div class='col-2 d-lg-none text-center'>" +
                                                                        
                                                                        "<i class='fa fa-chevron-down' aria-hidden='true'></i>" +
                                                
                                                                    "</div>" +
                                                
                                                                "</div>" +
                                                
                                                            "</div>" +
                                                
                                                        "</div>" +
                                                    
                                                        "<div class='card-body d-none-not-strict d-lg-block'>" +
                                                            
                                                            "<div class='container-fluid'>" +
                                                                
                                                                    "<div class='row justify-content-center'>" +
                                                                
                                                                            "<div class='col-12 col-md-4'>" +
                                                                
                                                                                "<img class='img-fluid cardsAll-table img' src='http://" +
                                                                                String(window.config.server.address) + ":" + String(window.config.server.port) +
                                                                                "/client/images/cards/" +
                                                                                String(card.image) + "'>" +
                                                
                                                                            "</div>" +
                                                                            
                                                
                                                                            "<div class='col d-md-none m-2'></div>" +
                                                                            
                                                                            "<div class='col-12 col-md-8'>" +
                                                
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-8'> Have: </div>" +

                                                                                            "<div class='col-4 ml-auto'>" +
                                                                                            "<input type='checkbox' class='input-checkbox cardsAll-table_card_have'>" +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                
                                                
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-8'> Mile:  </div>" +

                                                                                            "<div class='col-4 ml-auto'>" +
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
                    
                });
                
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
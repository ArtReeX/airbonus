/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, showPageCardsAmEx*/

$(document).ready(function () {

    'use strict';
    
    // обработка приёма списка всех вычисленных вариантов
    window.socket.off("computation_get").on("computation_get", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "computation") {

            // очистка блока с содержимым таблиц
            $("#computation-result_tables").empty();
            
            // скрытие предзагрузчика
            $("#computation-preloader").hide();

            if (result.data.computation.length) {
                
                // изменение статистики
                $("#computation-statistics-combination").text(String(result.data.treated_combinations)).spincrement({ duration: 800 });
                $("#computation-statistics-cards").text(String(result.data.number_of_cards)).spincrement({ duration: 800 });
                
                // показ статистики
                $("#computation-statistics").show();
                
                // обработка данных
                result.data.computation.forEach(function (computation, computation_count) {
                    
                    // добавление заголовка со счётчиком варианта
                    $("#computation-result_tables").append("<div class='row justify-content-center p-1'>" +
                                                           "<div class='col h2 text-center'>" +
                                                           "<p class='text-uppercase'>" +
                                                           "<b> Option " + Number(computation_count + 1) +
                                                           " <b><p>" +
                                                           "</div>" +
                                                           "</div>");
                    
                    // добавление информации о недостатке бюджета
                    if (computation.low === true) {
                        
                        $("#computation-result_tables").append("<div class='row justify-content-center p-2'>" +
                                                               "<div class='col lead text-center'>" +
                                                               "Unfortunately, you regular monthly spending is lower than required to receive a bonus. Assuming you can make some large purchases sooner, we have calculated for you the following card combination to ensure free travel." +
                                                               "</div>" +
                                                               "</div>");
                        
                    }
                    
                    // определение блоков
                    $("#computation-result_tables").append("<div id='computation-result_tables_variant_" + computation_count + "'></div>");
                    
                    $("#computation-result_tables_variant_" + computation_count).append("<div class='row p-3' id='computation-result_tables_variant_" + computation_count + "_direct_variants'></div>");
                    
                    $("#computation-result_tables_variant_" + computation_count).append("<div class='col-12' id='computation-result_tables_variant_" + computation_count + "_direct_info'></div>");
                    
                    $("#computation-result_tables_variant_" + computation_count).append("<div class='row p-3' id='computation-result_tables_variant_" + computation_count + "_back_variants'></div>");
                    
                    $("#computation-result_tables_variant_" + computation_count).append("<div class='col-12' id='computation-result_tables_variant_" + computation_count + "_back_info'></div>");
                    
                    // добавление карт для прямого перелёта в таблицу вариантов
                    computation.direct.variants.forEach(function (variant) {
                        
                        $("#computation-result_tables_variant_" + computation_count + "_direct_variants").append("<div class='col-12 col-lg-6'>" +
                                                
                                                    "<div class='card mb-3 bg-content " + String((variant.have ? "border-success" : "border-primary")) + " text-white'>" +
                                                        
                                                        "<div class='card-header'>" +
                                                
                                                            "<div class='container-fluid'>" +
                                                
                                                                "<div class='row'>" +
                                                                
                                                                    "<div class='col-10 col-lg-12 lead'>" +
                                                                        
                                                                        "<div class='row'>" +
                                                                        
                                                                            "<div class='col-8'>" +
                                                                            
                                                                                String(variant.card) +
                                                                                
                                                                                String(variant.conversion ? "<br> <span class='badge badge-info'>card to accept transferred miles</span>" : "") +
                                                                                            
                                                                            "</div>" +
                                                                                            
                                                                            "<div class='col-3 ml-auto text-center'>" +
                                                                            
                                                                                "<a class='text-white' href='" +
                                                                                String(variant.link) +
                                                                                "'target='_blank'>" +
                                                                                "<i class='fa fa-external-link' aria-hidden='true'></i>" +
                                                                                "</a>" +
                                                                                            
                                                                            "</div>" +
                                                                                            
                                                                        "</div>" +
                                                                                            
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
                                                                                String(variant.image) + "'>" +
                                                
                                                                            "</div>" +
                                                                            
                                                                                            
                                                                            "<div class='col d-md-none m-2'></div>" +
                                                                                       
                                                                                            
                                                                            "<div class='col-12 col-md-8'>" +
                                                
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Airline: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.airline) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                           
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> From: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.from) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                            
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> To: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.to) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                            
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Year fee: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.fee1) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                           
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                           
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Amount to spend: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.amount) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
                                                                                          
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                          
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Ticket cost (in miles): </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.price_of_one_ticket) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                           
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Number of tickets: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.tickets) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                          
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                          
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Miles: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.available_amount_of_bonuses) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                           
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                           
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> You card: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String((variant.have ? "Yes" : "No")) +
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
                        
                        
                        // добавление бонусных карт
                        if (variant.converted_cards) {
                            
                            variant.converted_cards.forEach(function (conversion_variant) {

                                $("#computation-result_tables_variant_" + computation_count + "_direct_variants").append("<div class='col-12 col-lg-6'>" +

                                                            "<div class='card mb-3 bg-content " + String((conversion_variant.card.have ? "border-success" : "border-primary")) + " text-white'>" +

                                                                "<div class='card-header'>" +

                                                                    "<div class='container-fluid'>" +

                                                                        "<div class='row'>" +

                                                                            "<div class='col-10 col-lg-12 lead'>" +

                                                                                "<div class='row'>" +

                                                                                    "<div class='col-8'>" +

                                                                                        String(conversion_variant.card.name) +

                                                                                        "<br> <span class='badge badge-secondary'>card to transfer miles from</span>" +

                                                                                    "</div>" +

                                                                                    "<div class='col-3 ml-auto text-center'>" +

                                                                                        "<a class='text-white' href='" +
                                                                                        String(conversion_variant.card.link) +
                                                                                        "'target='_blank'>" +
                                                                                        "<i class='fa fa-external-link' aria-hidden='true'></i>" +
                                                                                        "</a>" +

                                                                                    "</div>" +

                                                                                "</div>" +

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
                                                                                        String(conversion_variant.card.image) + "'>" +

                                                                                    "</div>" +


                                                                                    "<div class='col d-md-none m-2'></div>" +


                                                                                    "<div class='col-12 col-md-8'>" +
                                                                                                    

                                                                                        "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +


                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-12 col-md-12'>" +

                                                                                                "<div class='row justify-content-center'>" +

                                                                                                    "<div class='col-6'> Year fee: </div>" +

                                                                                                    "<div class='col-6 ml-auto'>" +
                                                                                                        String(conversion_variant.params.fee1) +
                                                                                                    "</div>" +

                                                                                                "</div>" +

                                                                                            "</div>" +

                                                                                        "</div>" +


                                                                                        "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +


                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-12 col-md-12'>" +

                                                                                                "<div class='row justify-content-center'>" +

                                                                                                    "<div class='col-6'> Amount to spend: </div>" +

                                                                                                    "<div class='col-6 ml-auto'>" +
                                                                                                        String(conversion_variant.params.amount) +
                                                                                                    "</div>" +

                                                                                                "</div>" +

                                                                                            "</div>" +

                                                                                        "</div>" +


                                                                                        "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +


                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-12 col-md-12'>" +

                                                                                                "<div class='row justify-content-center'>" +

                                                                                                    "<div class='col-6'> Total miles: </div>" +

                                                                                                    "<div class='col-6 ml-auto'>" +
                                                                                                        String(conversion_variant.params.bonus_cur) +
                                                                                                    "</div>" +

                                                                                                "</div>" +

                                                                                            "</div>" +

                                                                                        "</div>" +


                                                                                        "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +


                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-12 col-md-12'>" +

                                                                                                "<div class='row justify-content-center'>" +

                                                                                                    "<div class='col-6'> You card: </div>" +

                                                                                                    "<div class='col-6 ml-auto'>" +
                                                                                                        String((conversion_variant.card.have ? "Yes" : "No")) +
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
                        
                        
                    });
                    
                    // добавление информации о суммарной стоимости для прямого перелёта
                    $("#computation-result_tables_variant_" + computation_count + "_direct_info").append("<div class='row justify-content-center'>" +
                                                           
                                                                "<div class='col-12 card-subtitle m-2 text-white text-center'>" +
                                                           
                                                                    "<div class='col-12 mt-1 mb-1 p-0'><hr class='my-1'></div>" +
                                                                    
                                                                    "<div class='col-12'>" +
                                                                    
                                                                        "<div class='row justify-content-center'>" +

                                                                            "<div class='col-12 col-md-5'>" +

                                                                                "<div> Total ticket price (in miles): " +

                                                                                    "<div id='computation-result_tables_variant_" + computation_count + "_direct_info_price_miles'>" +
                                                                                        String(computation.direct.info.total_ticket_price_in_miles) +
                                                                                    "</div>" +

                                                                                "</div>" +

                                                                            "</div>" +

                                                                            "<div class='col-12 col-md-5 ml-auto'>" +

                                                                                "<div> Total number of miles available on all cards: " +

                                                                                    "<div id='computation-result_tables_variant_" + computation_count + "_direct_info_available_miles'>" +
                                                                                        String(computation.direct.info.total_miles_available_on_all_cards) +
                                                                                    "</div>" +

                                                                                "</div>" +

                                                                            "</div>" +

                                                                        "</div>" +
                                                                                                         
                                                                    "</div>" +
                                                           
                                                                "</div>" +
                                                                    
                                                            "</div>");
                    
                    
                    // добавление карт для обратного перелёта в таблицу вариантов
                    computation.back.variants.forEach(function (variant) {
                        
                        $("#computation-result_tables_variant_" + computation_count + "_back_variants").append("<div class='col-12 col-lg-6'>" +
                                                
                                                    "<div class='card mb-3 bg-content " + String((variant.have ? "border-success" : "border-primary")) + " text-white'>" +
                                                        
                                                        "<div class='card-header'>" +
                                                
                                                            "<div class='container-fluid'>" +
                                                
                                                                "<div class='row'>" +
                                                                
                                                                    "<div class='col-10 col-lg-12 lead'>" +
                                                                        
                                                                        "<div class='row'>" +
                                                                        
                                                                            "<div class='col-8'>" +
                                                                            
                                                                                String(variant.card) +
                                                                                
                                                                                String(variant.conversion ? "<br> <span class='badge badge-info'>card to accept transferred miles</span>" : "") +
                                                                                            
                                                                            "</div>" +
                                                                                            
                                                                            "<div class='col-3 ml-auto text-center'>" +
                                                                            
                                                                                "<a class='text-white' href='" +
                                                                                String(variant.link) +
                                                                                "'target='_blank'>" +
                                                                                "<i class='fa fa-external-link' aria-hidden='true'></i>" +
                                                                                "</a>" +
                                                                                            
                                                                            "</div>" +
                                                                                            
                                                                        "</div>" +
                                                                                            
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
                                                                                String(variant.image) + "'>" +
                                                
                                                                            "</div>" +
                                                                            
                                                                                            
                                                                            "<div class='col d-md-none m-2'></div>" +
                                                                                       
                                                                                            
                                                                            "<div class='col-12 col-md-8'>" +
                                                
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Airline: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.airline) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                           
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> From: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.from) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                            
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> To: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.to) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                            
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Year fee: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.fee1) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                           
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                           
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Amount to spend: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.amount) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
                                                                                          
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                          
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Ticket cost (in miles): </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.price_of_one_ticket) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                           
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Number of tickets: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.tickets) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                          
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                          
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Miles: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.available_amount_of_bonuses) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                           
                                                                                            
                                                                                "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +
                                                                                           
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> You card: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String((variant.have ? "Yes" : "No")) +
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
                        
                        
                        // добавление бонусных карт
                        if (variant.converted_cards) {
                            
                            variant.converted_cards.forEach(function (conversion_variant) {

                                $("#computation-result_tables_variant_" + computation_count + "_back_variants").append("<div class='col-12 col-lg-6'>" +

                                                            "<div class='card mb-3 bg-content " + String((conversion_variant.card.have ? "border-success" : "border-primary")) + " text-white'>" +

                                                                "<div class='card-header'>" +

                                                                    "<div class='container-fluid'>" +

                                                                        "<div class='row'>" +

                                                                            "<div class='col-10 col-lg-12 lead'>" +

                                                                                "<div class='row'>" +

                                                                                    "<div class='col-8'>" +

                                                                                        String(conversion_variant.card.name) +

                                                                                        "<br> <span class='badge badge-secondary'>card to transfer miles from</span>" +

                                                                                    "</div>" +

                                                                                    "<div class='col-3 ml-auto text-center'>" +

                                                                                        "<a class='text-white' href='" +
                                                                                        String(conversion_variant.card.link) +
                                                                                        "'target='_blank'>" +
                                                                                        "<i class='fa fa-external-link' aria-hidden='true'></i>" +
                                                                                        "</a>" +

                                                                                    "</div>" +

                                                                                "</div>" +

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
                                                                                        String(conversion_variant.card.image) + "'>" +

                                                                                    "</div>" +


                                                                                    "<div class='col d-md-none m-2'></div>" +


                                                                                    "<div class='col-12 col-md-8'>" +
                                                                                                    

                                                                                        "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +


                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-12 col-md-12'>" +

                                                                                                "<div class='row justify-content-center'>" +

                                                                                                    "<div class='col-6'> Year fee: </div>" +

                                                                                                    "<div class='col-6 ml-auto'>" +
                                                                                                        String(conversion_variant.params.fee1) +
                                                                                                    "</div>" +

                                                                                                "</div>" +

                                                                                            "</div>" +

                                                                                        "</div>" +


                                                                                        "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +


                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-12 col-md-12'>" +

                                                                                                "<div class='row justify-content-center'>" +

                                                                                                    "<div class='col-6'> Amount to spend: </div>" +

                                                                                                    "<div class='col-6 ml-auto'>" +
                                                                                                        String(conversion_variant.params.amount) +
                                                                                                    "</div>" +

                                                                                                "</div>" +

                                                                                            "</div>" +

                                                                                        "</div>" +


                                                                                        "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +


                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-12 col-md-12'>" +

                                                                                                "<div class='row justify-content-center'>" +

                                                                                                    "<div class='col-6'> Total miles: </div>" +

                                                                                                    "<div class='col-6 ml-auto'>" +
                                                                                                        String(conversion_variant.params.bonus_cur) +
                                                                                                    "</div>" +

                                                                                                "</div>" +

                                                                                            "</div>" +

                                                                                        "</div>" +


                                                                                        "<div class='col-12 mt-2 mb-2 p-0'><hr class='my-1'></div>" +


                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-12 col-md-12'>" +

                                                                                                "<div class='row justify-content-center'>" +

                                                                                                    "<div class='col-6'> You card: </div>" +

                                                                                                    "<div class='col-6 ml-auto'>" +
                                                                                                        String((conversion_variant.card.have ? "Yes" : "No")) +
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
                        
                        
                    });
                    
                    // добавление информации о суммарной стоимости для прямого перелёта
                    $("#computation-result_tables_variant_" + computation_count + "_back_info").append("<div class='row justify-content-center'>" +
                                                           
                                                                "<div class='col-12 card-subtitle m-2 text-white text-center'>" +
                                                           
                                                                    "<div class='col-12 mt-1 mb-1 p-0'><hr class='my-1'></div>" +
                                                                    
                                                                    "<div class='col-12'>" +
                                                                    
                                                                        "<div class='row justify-content-center'>" +

                                                                            "<div class='col-12 col-md-5'>" +

                                                                                "<div> Total ticket price (in miles): " +

                                                                                    "<div id='computation-result_tables_variant_" + computation_count + "_back_info_price_miles'>" +
                                                                                        String(computation.back.info.total_ticket_price_in_miles) +
                                                                                    "</div>" +

                                                                                "</div>" +

                                                                            "</div>" +

                                                                            "<div class='col-12 col-md-5 ml-auto'>" +

                                                                                "<div> Total number of miles available on all cards: " +

                                                                                    "<div id='computation-result_tables_variant_" + computation_count + "_back_info_available_miles'>" +
                                                                                        String(computation.back.info.total_miles_available_on_all_cards) +
                                                                                    "</div>" +

                                                                                "</div>" +

                                                                            "</div>" +

                                                                        "</div>" +
                                                                                                         
                                                                    "</div>" +
                                                           
                                                                "</div>" +
                                                                    
                                                            "</div>");
                    
                });
                
                // показ обработанного содержимого
                $("#computation-result_tables").show();
                
            } else { $("#computation-header_empty").show(); $("#computation-statistics").hide(); }

        }

    });
    
});
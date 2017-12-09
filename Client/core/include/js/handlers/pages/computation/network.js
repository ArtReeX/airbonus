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

            if (result.data.computation.length) {
                
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
                    
                    /*// добавление заголовка таблицы варианта
                    $("#computation-result_tables").append("<div class='row justify-content-center'>" +
                                                           "<div class='col p-0 text-center'>" +
                                                           "<table class='table table-responsive table-active table-bordered'>" +
                                                           "<thead>" +
                                                           "<tr>" +
                                                           "<th>Card</th>" +
                                                           "<th>Airline</th>" +
                                                           "<th>From</th>" +
                                                           "<th>To</th>" +
                                                           "<th>Tickets</th>" +
                                                           "<th>Year fee/Amount to spend</th>" +
                                                           "<th>Mile</th>" +
                                                           "<th>Your card</th>" +
                                                           "</tr>" +
                                                           "</thead>" +
                                                           "<tbody id='computation-result_tables_variant_" + computation_count + "'></tbody>" +
                                                           "<table></div></div>");

                    // добавление карт в таблицу вариантов
                    computation.variant.forEach(function (variant) {
                    
                        $("#computation-result_tables_variant_" + computation_count).append("<tr>" +
                                                                                            "<td>" +
                                                                                            "<a href='" +
                                                                                            variant.link + "'target='_blank'>" +
                                                                                            variant.card +
                                                                                            "</a>" +
                                                                                            "<br>" +
                                                                                            "<img style='width: 40%; margin-left: 30%; margin-right: 30%;' src='http://" +
                                                                                            String(window.config.server.address) + ":" + String(window.config.server.port) +
                                                                                            "/client/images/cards/" +
                                                                                            String(variant.image) +
                                                                                            "'>" +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            variant.airline +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            variant.from +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            variant.to +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            variant.tickets +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            variant.fee1 +
                                                                                            "/" +
                                                                                            variant.amount +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            variant.mile +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            (variant.have ? "Yes" : "No") +
                                                                                            "</td>" +
                                                                                            "</tr>");
                    });*/
                    
                    // определение блока
                    $("#computation-result_tables").append("<div class='row p-3' id='computation-result_tables_variant_" + computation_count + "'></div>");
                    
                    // добавление карт в таблицу вариантов
                    computation.variant.forEach(function (variant) {
                        
                        $("#computation-result_tables_variant_" + computation_count).append("<div class='col-12 col-lg-6'>" +
                                                
                                                    "<div class='card mb-3 bg-content " + String((variant.have ? "border-success" : "border-primary")) + " text-white'>" +
                                                        
                                                        "<div class='card-header'>" +
                                                
                                                            "<div class='container-fluid'>" +
                                                
                                                                "<div class='row'>" +
                                                                
                                                                    "<div class='col-10 col-lg-12 lead'>" +
                                                                        
                                                                        "<div class='row'>" +
                                                                        
                                                                            "<div class='col-8'>" +
                                                                            
                                                                                String(variant.card) +
                                                                                            
                                                                            "</div>" +
                                                                                            
                                                                            "<div class='col-3 ml-auto text-center'>" +
                                                                            
                                                                                "<a class='text-white' href='" +
                                                                                variant.link +
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
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Tickets: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.tickets) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
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
                                                                                            
                                                                                "<div class='row justify-content-center'>" +
                                                
                                                                                    "<div class='col-12 col-md-12'>" +

                                                                                        "<div class='row justify-content-center'>" +

                                                                                            "<div class='col-6'> Mile: </div>" +

                                                                                            "<div class='col-6 ml-auto'>" +
                                                                                                String(variant.mile) +
                                                                                            "</div>" +

                                                                                        "</div>" +

                                                                                    "</div>" +
                                                                
                                                                                "</div>" +
                                                                                            
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
                        
                        
                    });
                    
                });
                
                // показ обработанного содержимого
                $("#computation-result_tables").show();
                
            } else { $("#computation-header_empty").show(); }

        }

    });
    
});
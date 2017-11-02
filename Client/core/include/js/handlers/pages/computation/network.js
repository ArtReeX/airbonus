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
                
                var computation_count, variant_count;
                for (computation_count = 0; computation_count < result.data.computation.length; computation_count += 1) {
                    
                    // добавление заголовка со счётчиком варианта
                    $("#computation-result_tables").append("<div class='row justify-content-center'>" +
                                                           "<div class='col h2 text-center'>" +
                                                           "<p class='text-uppercase'>" +
                                                           "<b> Option " +
                                                           Number(computation_count + 1) +
                                                           " <b><p>" +
                                                           "</div>" +
                                                           "</div>");
                    
                    // добавление информации о недостатке бюджета
                    if (result.data.computation[computation_count].low === true) {
                        
                        $("#computation-result_tables").append("<div class='row justify-content-center'>" +
                                                               "<div class='col lead text-center'>" +
                                                               "Unfortunately, you regular monthly spending is lower than required to receive a bonus. Assuming you can make some large purchases sooner, we have calculated for you the following card combination to ensure free travel." +
                                                               "</div>" +
                                                               "</div>");
                        
                    }
                    
                    // добавление заголовка таблицы варианта
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
                    for (variant_count = 0; variant_count < result.data.computation[computation_count].variant.length; variant_count += 1) {
                    
                        $("#computation-result_tables_variant_" + computation_count).append("<tr>" +
                                                                                            "<td>" +
                                                                                            "<a href='" +
                                                                                            result.data.computation[computation_count].variant[variant_count].link + "'target='_blank'>" + result.data.computation[computation_count].variant[variant_count].card +
                                                                                            "</a>" +
                                                                                            "<br>" +
                                                                                            "<img style='width: 40%; margin-left: 30%; margin-right: 30%;' src='http://" +
                                                                                            String(window.config.server.address) + ":" + String(window.config.server.port) +
                                                                                            "/client/images/cards/" +
                                                                                            String(result.data.computation[computation_count].variant[variant_count].image) +
                                                                                            "'>" +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            result.data.computation[computation_count].variant[variant_count].airline +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            result.data.computation[computation_count].variant[variant_count].from +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            result.data.computation[computation_count].variant[variant_count].to +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            result.data.computation[computation_count].variant[variant_count].tickets +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            result.data.computation[computation_count].variant[variant_count].fee1 +
                                                                                            "/" +
                                                                                            result.data.computation[computation_count].variant[variant_count].amount +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            result.data.computation[computation_count].variant[variant_count].mile +
                                                                                            "</td>" +
                                                                                            "<td>" +
                                                                                            (result.data.computation[computation_count].variant[variant_count].have ? "Yes" : "No") +
                                                                                            "</td>" +
                                                                                            "</tr>");
                    }
                    
                }
                
                // показ обработанного содержимого
                $("#computation-result_tables").show();
                
            } else { $("#computation-header_empty").show(); }

        }

    });
    
});
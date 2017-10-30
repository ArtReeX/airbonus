/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, showPageCardsAmEx*/

$(document).ready(function () {

    'use strict';
    
    // обработка приёма списка всех карт
    window.socket.on("computation_get", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "computation") {

            // очистка блока с содержимым таблиц
            $("#computation-result_tables").empty();

            if (result.data.computation.length) {
                
                var computation_count;
                for (computation_count = 0; computation_count < result.data.computation.length; computation_count += 1) {
                    
                    // добавление заголовка таблицы
                    $("#computation-result_tables").append("<div class='row justify-content-center'>" +
                                                           "<div class='col h2 text-center'>" +
                                                           "<p class='text-uppercase'>" +
                                                           "<b> Variant " +
                                                           Number(computation_count + 1) +
                                                           " <b><p>" +
                                                           "</div></div>");
                    
                    // добавление информации о недостатке бюджета
                    $("#computation-result_tables").append("<div class='row justify-content-center'>" +
                                                           "<div class='col lead text-center'>" +
                                                           "Unfortunately, you regular monthly spending is lower than required to receive a bonus. Assuming you can make some large purchases sooner, we have calculated for you the following card combination to ensure free travel." +
                                                           "</div></div>");
                    
                }
                
            } else { $("#computation-header_empty").show(); }

        }

    });
    
});
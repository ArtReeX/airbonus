/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, showPageCardsAmEx*/

$(document).ready(function () {

    'use strict';
    
    // обработка приёма списка всех карт
    window.socket.on("computation_get", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "computation") {

            // очистка таблицы с картами
            $("#computation-table").empty();

            if (result.data.computation.length) {

                var computation_count;
                for (computation_count = 0; computation_count < result.data.computation.length; computation_count += 1) {
                    
                    
                    
                }
                
            } else { $("#computation-header_empty").show(); }

        }

    });
    
});
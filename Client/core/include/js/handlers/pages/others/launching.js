/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document*/

$(document).ready(function () {

    'use strict';
    
    // скрываем по умолчанию уведомления
    $("#others-info_warning_block, #others-info_warning, #others-info_danger_block, #others-info_danger").hide();
    
    // заполнение списка с выбором минимального количества пассажиров
    function othersPassengersInit() {
                
        // проверка соответствие обработчика со страницей
        if (window.identifier === "others") {
            
            // очистка списков
            $("#others-passengers_min, #others-passengers_max").empty();
            
            var count;
            for (count = 0; count <= 5; count += 1) {
                $("#others-passengers_min, #others-passengers_max").append("<option value='" + count + "'>" + count + "</option>");
            }

        }
        
    }
    
    // инициализация списков
    othersPassengersInit();

    
    // запрос от сервера списка всех семейных положений
    window.socket.emit("others_get");
    
});

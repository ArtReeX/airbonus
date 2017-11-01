/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, showPageAirlines*/

$(document).ready(function () {

    'use strict';
    
    // обработка приёма списка начальных аэропортов
    window.socket.on("airlines_get", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "airlines") {

            // очистка списка с авиалиниями и их счётчика
            $("#airlines-list_companies, #airlines-list_count").empty();

            if (result.data.airlines.length) {
                
                var airlines_count;
                for (airlines_count = 0; airlines_count < result.data.airlines.length; airlines_count += 1) {
                    
                    $("#airlines-list_companies").append("<li>" + String(result.data.airlines[airlines_count].name) + "</li>");
                    
                }
                
                // установка счётчика авиалиний
                $("#airlines-list_count").text("Total of " + result.data.airlines.length + " companies");
                
                // показ обработанного содержимого
                $("#airlines-list").show();
                
                
            } else {
                
                // скрытие списка с авиалиниями и кнопки перехода на следующую страницу
                $("#airlines-list, #airlines-button_goto_next").hide();
                
                // изменение заголовка
                $("#airlines-head p b").text("Sorry!");
                
                // изменение подзаголовка
                $("#airlines-subhead p b").text("We have not found airlines connecting the airports you chose.");
                
            }

        }

    });
    
});
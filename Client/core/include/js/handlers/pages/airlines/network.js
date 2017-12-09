/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, showPageAirlines*/

$(document).ready(function () {

    'use strict';
    
    // обработка приёма списка начальных аэропортов
    window.socket.off("airlines_get").on("airlines_get", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "airlines") {

            // очистка списка с авиалиниями и их счётчика
            $("#airlines-list_companies, #airlines-list_count").empty();

            if (result.data.airlines.length) {
                
                result.data.airlines.forEach(function (airline) {
                    
                    $("#airlines-list_companies").append("<li class='list-group-item' style='background-color: #4e8398;'>" + String(airline.name) + "</li>");
                    
                });
                
                // установка счётчика авиалиний
                $("#airlines-list_count").text("Total of " + result.data.airlines.length + " companies");
                
                // показ обработанного содержимого
                $("#airlines-list").show();
                
                
            } else {
                
                // скрытие списка с авиалиниями и кнопки перехода на следующую страницу
                $("#airlines-list, #airlines-button_goto_next").hide();
                
                // изменение заголовка
                $("#airlines-head h1").text("Sorry!");
                
                // изменение подзаголовка
                $("#airlines-subhead p").text("We have not found airlines connecting the airports you chose.");
                
            }

        }

    });
    
});
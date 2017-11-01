/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window*/

$(document).ready(function () {

    'use strict';

    // обработчик ввода строки в поле начального аэропорта
    $("#loaded").off("keyup", "#airports-from").on("keyup", "#airports-from", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "airports") {
            
            // скрытие другого списка с подсказками
            $("#airports-to_tips").empty().hide();
            
            if ($("#airports-from").val().trim() !== "") {
            
                // преобразование в верхний регистр
                $("#airports-from").val($("#airports-from").val().toUpperCase());

                window.socket.emit("airports_get_from", String($("#airports-from").val()));

            } else {
                // скрытие списка с подсказками
                $("#airports-from_tips").empty().hide();
            }

        }

    });
    
    // обработчик ввода строки в поле конечного аэропорта
    $("#loaded").off("keyup", "#airports-to").on("keyup", "#airports-to", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "airports") {
            
            // скрытие другого списка с подсказками
            $("#airports-from_tips").empty().hide();
            
            if ($("#airports-to").val().trim() !== "") {
            
                // преобразование в верхний регистр
                $("#airports-to").val($("#airports-to").val().toUpperCase());

                window.socket.emit("airports_get_to", String($("#airports-to").val()));
                
            } else {
                // скрытие списка с подсказками
                $("#airports-to_tips").empty().hide();
            }

        }

    });
    
    // обработчик выбора из списка подсказки к начальному аэропорту
    $("#loaded").off("click", "#airports-from_tips .list-group-item").on("click", "#airports-from_tips .list-group-item", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "airports") {

            // перенос значения из списка подсказок в поле ввода
            $("#airports-from").val($(this).attr("value").toUpperCase());
            
            // скрытие списка с подсказками
            $("#airports-from_tips").empty().hide();

        }

    });
    
    // обработчик выбора из списка подсказки к конечному аэропорту
    $("#loaded").off("click", "#airports-to_tips .list-group-item").on("click", "#airports-to_tips .list-group-item", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "airports") {
            
            // перенос значения из списка подсказок в поле ввода
            $("#airports-to").val($(this).attr("value").toUpperCase());
            
            // скрытие списка с подсказками
            $("#airports-to_tips").empty().hide();

        }

    });
    
    // обработчик нажатия кнопки для перехода на слудующую страницу
    $("#loaded").off("click", "#airports-button_goto_next").on("click", "#airports-button_goto_next", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "airports") {
            
            // скрытие списков с подсказками
            $("#airports-from_tips, #airports-to_tips").empty().hide();
            
            // отправка выбранных данных на сервер для проверки
            window.socket.emit("airports_set", String($("#airports-from").val()), String($("#airports-to").val()));

        }

    });

});
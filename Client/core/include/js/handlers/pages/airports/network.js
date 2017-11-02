/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, showPageAirlines*/

$(document).ready(function () {

    'use strict';
    
    // обработка приёма списка начальных аэропортов
    window.socket.off("airports_get_from").on("airports_get_from", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "airports") {

            // очистка списка с подсказками
            $("#airports-from_tips").empty();

            if (result.data.airports.length) {
                
                var airports_count;
                
                for (airports_count = 0; airports_count < result.data.airports.length; airports_count += 1) {
                    
                    $("#airports-from_tips").append("<li class='list-group-item list-group-item-action' value='" +
                                                    String(result.data.airports[airports_count].iata) +
                                                    "'>" +
                                                    String(result.data.airports[airports_count].iata) +
                                                    "(" +
                                                    String(result.data.airports[airports_count].name) +
                                                    ", " +
                                                    String(result.data.airports[airports_count].city) +
                                                    ")" +
                                                    "</li>");
                    
                }
                
                // показ списка с подсказками
                $("#airports-from_tips").show();
                
            } else {
                // скрытие списка с подсказками
                $("#airports-from_tips").empty().hide();
            }

        }

    });
    
    // обработка приёма списка конечных аэропортов
    window.socket.off("airports_get_to").on("airports_get_to", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "airports") {

            // очистка списка с подсказками
            $("#airports-to_tips").empty();

            if (result.data.airports.length) {
                
                var airports_count;
                for (airports_count = 0; airports_count < result.data.airports.length; airports_count += 1) {
                    
                    $("#airports-to_tips").append("<li class='list-group-item list-group-item-action' value='" +
                                                    String(result.data.airports[airports_count].iata) +
                                                    "'>" +
                                                    String(result.data.airports[airports_count].iata) +
                                                    "(" +
                                                    String(result.data.airports[airports_count].name) +
                                                    ", " +
                                                    String(result.data.airports[airports_count].city) +
                                                    ")" +
                                                    "</li>");
                    
                }
                
                // показ списка с подсказками
                $("#airports-to_tips").show();
                
            } else {
                // скрытие списка с подсказками
                $("#airports-to_tips").empty().hide();
            }

        }

    });
    
    // обработчик получения ответа о правильности данных от сервера
    window.socket.off("airports_set").on("airports_set", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "airports") {

            if (result.error) {

                // ОБРАБОТКА ОШИБОК

                if (result.error.type === "database") {

                    // показываем ошибку
                    $("#airports-info_danger_block").show();
                    $("#airports-info_danger").text("Database error.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#airports-info_danger_block").hide();
                        $("#airports-info_danger").empty().hide();
                    }, 2000);

                } else if (result.error.type === "no_exist_airport") {

                    // показываем ошибку
                    $("#airports-info_warning_block").show();
                    $("#airports-info_warning").text("A non-existent airport.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#airports-info_warning_block").hide();
                        $("#airports-info_warning").empty().hide();
                    }, 2000);

                } else if (result.error.type === "same_airports") {

                    // показываем ошибку
                    $("#airports-info_warning_block").show();
                    $("#airports-info_warning").text("Identical airports.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#airports-info_warning_block").hide();
                        $("#airports-info_warning").empty().hide();
                    }, 2000);

                }

            } else {

                // ОБРАБОТКА ОТВЕТОВ

                if (Boolean(result.data.next) === true) { showPageAirlines(); }

            }

        }

    });
    
});
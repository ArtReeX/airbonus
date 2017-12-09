/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, showPageCardsAll*/

$(document).ready(function () {

    'use strict';
    
    // обработка приёма списка доступных зароботков
    window.socket.off("incomes_get").on("incomes_get", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "incomes") {

            // очистка списка с вариантами дрступных заработков
            $("#incomes-list").empty();

            if (result.data.incomes.length) {

                result.data.incomes.forEach(function (income) {
                    
                    $("#incomes-list").append("<option value='" +
                                              String(income.id) +
                                              "'>" +
                                              String(income.min) +
                                              " - " +
                                              String(income.max) +
                                              "</option>");
                    
                });
                       
            }
            
            // показ обработанного содержимого
            $("#incomes-list").show();

        }

    });
    
    // обработчик получения ответа о правильности данных от сервера
    window.socket.off("incomes_set").on("incomes_set", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "incomes") {

            if (result.error) {

                // ОБРАБОТКА ОШИБОК

                if (result.error.type === "database") {

                    // показываем ошибку
                    $("#incomes-info_danger_block").show();
                    $("#incomes-info_danger").text("Database error.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#incomes-info_danger_block").hide();
                        $("#incomes-info_danger").empty().hide();
                    }, 2000);

                } else if (result.error.type === "paucity") {

                    // показываем ошибку
                    $("#incomes-info_warning_block").show();
                    $("#incomes-info_warning").text("We think you income or credit score is too low to be approved for most of the credit cards.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#incomes-info_warning_block").hide();
                        $("#incomes-info_warning").empty().hide();
                    }, 2000);

                }

            } else {

                // ОБРАБОТКА ОТВЕТОВ

                if (Boolean(result.data.next) === true) { showPageCardsAll(); }

            }

        }

    });
    
});
/************************ ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА ************************/
/*globals $, document, showPageIncomes*/

$(document).ready(function () {

    'use strict';
    
    // обработка приёма списка доступных кредитных рейтингов
    window.socket.off("scores_get").on("scores_get", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "scores") {

            // очистка списка с вариантами доступных кредитных рейтингов
            $("#scores-list").empty();

            if (result.data.scores.length) {

                var scores_count;
                for (scores_count = 0; scores_count < result.data.scores.length; scores_count += 1) {
                    
                    $("#scores-list").append("<option value='" +
                                             String(result.data.scores[scores_count].id) +
                                             "'>" +
                                             String(result.data.scores[scores_count].min) +
                                             " - " +
                                             String(result.data.scores[scores_count].max) +
                                             "</option>");
                    
                }
                       
            }
            
            // показ обработанного содержимого
            $("#scores-list").show();

        }

    });
    
    // обработчик получения ответа о правильности данных от сервера
    window.socket.off("scores_set").on("scores_set", function (result) {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "scores") {

            if (result.error) {

                // ОБРАБОТКА ОШИБОК

                if (result.error.type === "database") {

                    // показываем ошибку
                    $("#scores-info_danger_block").show();
                    $("#scores-info_danger").text("Database error.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#scores-info_danger_block").hide();
                        $("#scores-info_danger").empty().hide();
                    }, 2000);

                } else if (result.error.type === "paucity") {

                    // показываем ошибку
                    $("#scores-info_warning_block").show();
                    $("#scores-info_warning").text("We think you credit score is too low to be approved for most of the credit cards.").show();

                    // задаём таймер скрытия ошибки
                    setTimeout(function () {
                        $("#scores-info_warning_block").hide();
                        $("#scores-info_warning").empty().hide();
                    }, 2000);

                }

            } else {

                // ОБРАБОТКА ОТВЕТОВ

                if (Boolean(result.data.next) === true) { showPageIncomes(); }

            }

        }

    });
    
});
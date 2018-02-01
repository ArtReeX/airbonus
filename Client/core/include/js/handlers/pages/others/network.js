/* ОБРАБОТЧИКИ СООБЩЕНИЙ ОТ СЕРВЕРА */

$(document).ready(() => {
    // обработка приёма списка всех карт
    window.socket.off("others_get").on("others_get", result => {
        // проверка соответствие обработчика со страницей
        if (window.identifier === "others") {
            // очистка таблицы семейными статусами
            $("#others-statuses_list").empty();

            if (result.data.statuses.length) {
                result.data.statuses.forEach(status => {
                    $("#others-statuses_list").append(
                        "<option value='" +
                            String(status.id) +
                            "'>" +
                            String(status.name) +
                            "</option>"
                    );
                });
            }

            // показ обработанного содержимого
            $("#others-statuses_list").show();
        }
    });

    // обработчик получения ответа о правильности данных от сервера
    window.socket.off("others_set").on("others_set", result => {
        // проверка соответствие обработчика со страницей
        if (window.identifier === "others") {
            if (result.error) {
                // ОБРАБОТКА ОШИБОК

                if (result.error.type === "annual_less_monthly") {
                    // показываем ошибку
                    $("#others-info_warning_block").show();
                    $("#others-info_warning")
                        .text("Annual costs should be more than monthly.")
                        .show();

                    // задаём таймер скрытия ошибки
                    setTimeout(() => {
                        $("#others-info_warning_block").hide();
                        $("#others-info_warning")
                            .empty()
                            .hide();
                    }, 2000);
                } else if (result.error.type === "empty_memo") {
                    // показываем ошибку
                    $("#others-info_warning_block").show();
                    $("#others-info_warning")
                        .text("Not all fields are completed.")
                        .show();

                    // задаём таймер скрытия ошибки
                    setTimeout(() => {
                        $("#others-info_warning_block").hide();
                        $("#others-info_warning")
                            .empty()
                            .hide();
                    }, 2000);
                }
            } else {
                // ОБРАБОТКА ОТВЕТОВ

                if (Boolean(result.data.next) === true) {
                    showPageComputation();
                }
            }
        }
    });
});

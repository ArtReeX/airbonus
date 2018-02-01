/* ОБРАБОТЧИКИ ИНТЕРФЕЙСА */

$(document).ready(() => {
    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded")
        .off("click", "#others-button_goto_back")
        .on("click", "#others-button_goto_back", () => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "others") {
                showPageCardsAmEx();
            }
        });

    // обработчик нажатия кнопки для перехода на следующую страницу
    $("#loaded")
        .off("click", "#others-button_goto_next")
        .on("click", "#others-button_goto_next", () => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "others") {
                window.socket.emit("others_set", {
                    statusValue: Number(
                        $("#others-statuses_list")
                            .children(":selected")
                            .val()
                    ),

                    minPeople: Number(
                        $("#others-passengers_min")
                            .children(":selected")
                            .val()
                    ),
                    maxPeople: Number(
                        $("#others-passengers_max")
                            .children(":selected")
                            .val()
                    ),

                    spendNextMonth: Number($("#others-spend_month").val()),
                    spendNextYear: Number($("#others-spend_year").val())
                });
            }
        });

    // обработчик выбора минимального количества пассажиров
    $("#loaded")
        .off("change", "#others-passengers_min")
        .on("change", "#others-passengers_min", () => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "others") {
                // переменные для хранения
                let passengers_max = Number(
                        $("#others-passengers_max")
                            .children(":selected")
                            .val()
                    ),
                    count;

                // очистка списка максимального количества пассажиров
                $("#others-passengers_max").empty();

                // инициализация списка максимального количества пассажиров
                for (
                    count = Number(
                        $("#others-passengers_min")
                            .children(":selected")
                            .val()
                    );
                    count <= 5;
                    count += 1
                ) {
                    $("#others-passengers_max").append(
                        "<option value='" + count + "'>" + count + "</option>"
                    );
                }

                // проверка ранее выбранного значения
                if (
                    passengers_max <
                    $("#others-passengers_min")
                        .children(":selected")
                        .val()
                ) {
                    $("#others-passengers_max").val(
                        Number(
                            $("#others-passengers_min")
                                .children(":selected")
                                .val()
                        )
                    );
                } else {
                    $("#others-passengers_max").val(passengers_max);
                }
            }
        });
});

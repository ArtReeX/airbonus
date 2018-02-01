/* ОБРАБОТЧИКИ ИНТЕРФЕЙСА */

$(document).ready(() => {
    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded")
        .off("click", "#preScores-button_goto_back")
        .on("click", "#preScores-button_goto_back", () => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "preScores") {
                showPageAirlines();
            }
        });

    // обработчик нажатия кнопки для перехода на следующую страницу
    $("#loaded")
        .off("click", "#preScores-button_goto_next")
        .on("click", "#preScores-button_goto_next", () => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "preScores") {
                showPageScores();
            }
        });
});

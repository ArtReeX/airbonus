/* ОБРАБОТЧИКИ ИНТЕРФЕЙСА */

$(document).ready(() => {
    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded")
        .off("click", "#airlines-button_goto_back")
        .on("click", "#airlines-button_goto_back", () => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "airlines") {
                showPageAirports();
            }
        });

    // обработчик нажатия кнопки для перехода на следующую страницу
    $("#loaded")
        .off("click", "#airlines-button_goto_next")
        .on("click", "#airlines-button_goto_next", () => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "airlines") {
                showPagePreScores();
            }
        });
});

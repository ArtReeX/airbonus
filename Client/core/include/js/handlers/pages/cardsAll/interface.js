/* ОБРАБОТЧИКИ ИНТЕРФЕЙСА */

$(document).ready(() => {
    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded")
        .off("click", "#cardsAll-button_goto_back")
        .on("click", "#cardsAll-button_goto_back", () => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "cardsAll") {
                showPageIncomes();
            }
        });

    // обработчик нажатия кнопки для перехода на следующую страницу
    $("#loaded")
        .off("click", "#cardsAll-button_goto_next")
        .on("click", "#cardsAll-button_goto_next", () => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "cardsAll") {
                let selected_cards = [];
                $("#cardsAll-table > div").each((count, element) => {
                    // добавление только тех карт, для которых введено количество бонусов и стоит галочка активности
                    if (
                        $(element)
                            .find(".cardsAll-table_card_have")
                            .is(":checked") &&
                        Number(
                            $(element)
                                .find(".cardsAll-table_card_mile")
                                .val()
                                .trim()
                        ) >= 0
                    ) {
                        selected_cards.push({
                            card: Number(
                                $(element)
                                    .attr("value")
                                    .trim()
                            ),
                            bonus: Number(
                                $(element)
                                    .find(".cardsAll-table_card_mile")
                                    .val()
                                    .trim()
                            )
                        });
                    }
                });

                window.socket.emit("cards_set_all", selected_cards);
            }
        });
});

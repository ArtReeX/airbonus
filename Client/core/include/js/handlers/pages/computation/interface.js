/* ОБРАБОТЧИКИ ИНТЕРФЕЙСА */

let initializeNotifications = (variant, element) => {
    // константы с названиями элементов уведомлений
    const nameItem = "div[variant]",
        nameBlockDirect = "#direct_warning_block",
        nameBlockBack = "#back_warning_block",
        nameSubBlockDirect = "#direct_warning",
        nameSubBlockBack = "#back_warning";

    // бонусов достаточно для прямого и обратного рейта
    if (
        window.data.modified_results.computation[variant].direct.info
            .total_ticket_price_in_miles >
            window.data.modified_results.computation[variant].direct.info
                .total_miles_available_on_all_cards &&
        window.data.modified_results.computation[variant].back.info
            .total_ticket_price_in_miles >
            window.data.modified_results.computation[variant].back.info
                .total_miles_available_on_all_cards
    ) {
        // показ уведомления
        $(element)
            .closest(nameItem)
            .children(nameBlockDirect)
            .show();
        $(element)
            .closest(nameItem)
            .children(nameBlockDirect)
            .children(nameSubBlockDirect)
            .show();

        $(element)
            .closest(nameItem)
            .children(nameBlockBack)
            .show();
        $(element)
            .closest(nameItem)
            .children(nameBlockBack)
            .children(nameSubBlockBack)
            .show();

        return;
    }

    // бонусов недостаточно для прямого и обратного рейта
    if (
        window.data.modified_results.computation[variant].direct.info
            .total_ticket_price_in_miles <=
            window.data.modified_results.computation[variant].direct.info
                .total_miles_available_on_all_cards &&
        window.data.modified_results.computation[variant].back.info
            .total_ticket_price_in_miles <=
            window.data.modified_results.computation[variant].back.info
                .total_miles_available_on_all_cards
    ) {
        // скрытие уведомления
        $(element)
            .closest(nameItem)
            .children(nameBlockDirect)
            .hide();
        $(element)
            .closest(nameItem)
            .children(nameBlockDirect)
            .children(nameSubBlockDirect)
            .hide();

        $(element)
            .closest(nameItem)
            .children(nameBlockBack)
            .hide();
        $(element)
            .closest(nameItem)
            .children(nameBlockBack)
            .children(nameSubBlockBack)
            .hide();

        return;
    }

    // бонусов достаточно для прямого, но недостаточно для обратного рейта
    if (
        window.data.modified_results.computation[variant].direct.info
            .total_ticket_price_in_miles <=
            window.data.modified_results.computation[variant].direct.info
                .total_miles_available_on_all_cards &&
        window.data.modified_results.computation[variant].back.info
            .total_ticket_price_in_miles >
            window.data.modified_results.computation[variant].back.info
                .total_miles_available_on_all_cards
    ) {
        // скрытие уведомления
        $(element)
            .closest(nameItem)
            .children(nameBlockDirect)
            .hide();
        $(element)
            .closest(nameItem)
            .children(nameBlockDirect)
            .children(nameSubBlockDirect)
            .hide();

        $(element)
            .closest(nameItem)
            .children(nameBlockBack)
            .show();
        $(element)
            .closest(nameItem)
            .children(nameBlockBack)
            .children(nameSubBlockBack)
            .show();

        return;
    }

    // бонусов недостаточно для прямого, но достаточно для обратного рейта
    if (
        window.data.modified_results.computation[variant].direct.info
            .total_ticket_price_in_miles >
            window.data.modified_results.computation[variant].direct.info
                .total_miles_available_on_all_cards &&
        window.data.modified_results.computation[variant].back.info
            .total_ticket_price_in_miles <=
            window.data.modified_results.computation[variant].back.info
                .total_miles_available_on_all_cards
    ) {
        // скрытие уведомления
        $(element)
            .closest(nameItem)
            .children(nameBlockDirect)
            .show();
        $(element)
            .closest(nameItem)
            .children(nameBlockDirect)
            .children(nameSubBlockDirect)
            .show();

        $(element)
            .closest(nameItem)
            .children(nameBlockBack)
            .hide();
        $(element)
            .closest(nameItem)
            .children(nameBlockBack)
            .children(nameSubBlockBack)
            .hide();

        return;
    }
};

$(document).ready(() => {
    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded")
        .off("click", "#computation-button_goto_back")
        .on("click", "#computation-button_goto_back", () => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "computation") {
                showPageOthers();
            }
        });

    // обработчик ввода чисел в поле изменения цены билета для прямого маршрута
    $("#loaded")
        .off("input", "#direct_variants #price_of_one_ticket")
        .on("input", "#direct_variants #price_of_one_ticket", event => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "computation") {
                // текущий элемент
                let element = event.currentTarget,
                    // текущий номер варианта
                    variant = Number(
                        $(element)
                            .closest("div[variant]")
                            .attr("variant")
                            .trim()
                    ),
                    // текущий идентификатор карты
                    nIdentifier = Number(
                        $(element)
                            .closest("div[card]")
                            .attr("card")
                            .trim()
                    );

                // поиск преженей цены билета
                window.data.modified_results.computation[
                    variant
                ].direct.variants.forEach(card_computation => {
                    // если идентификаторы карт совпали
                    if (card_computation.card_id == nIdentifier) {
                        // если цена за один билет отличается
                        if (
                            card_computation.price_of_one_ticket !=
                            $(element)
                                .val()
                                .trim()
                        ) {
                            // изменение цвета кнопки
                            $(element)
                                .closest("div[card]")
                                .find("#computation-button_set_price")
                                .removeClass("btn-stable")
                                .addClass("btn-changed");
                        } else {
                            // изменение цвета кнопки
                            $(element)
                                .closest("div[card]")
                                .find("#computation-button_set_price")
                                .removeClass("btn-changed")
                                .addClass("btn-stable");
                        }
                    }
                });
            }
        });

    // обработчик ввода чисел в поле изменения цены билета для обратного маршрута
    $("#loaded")
        .off("input", "#back_variants #price_of_one_ticket")
        .on("input", "#back_variants #price_of_one_ticket", event => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "computation") {
                // текущий элемент
                let element = event.currentTarget,
                    // текущий номер варианта
                    variant = Number(
                        $(element)
                            .closest("div[variant]")
                            .attr("variant")
                            .trim()
                    ),
                    // текущий идентификатор карты
                    nIdentifier = Number(
                        $(element)
                            .closest("div[card]")
                            .attr("card")
                            .trim()
                    );

                // поиск преженей цены билета
                window.data.modified_results.computation[
                    variant
                ].back.variants.forEach(card_computation => {
                    // если идентификаторы карт совпали
                    if (card_computation.card_id == nIdentifier) {
                        // если цена за один билет отличается
                        if (
                            card_computation.price_of_one_ticket !=
                            $(element)
                                .val()
                                .trim()
                        ) {
                            // изменение цвета кнопки
                            $(element)
                                .closest("div[card]")
                                .find("#computation-button_set_price")
                                .removeClass("btn-stable")
                                .addClass("btn-changed");
                        } else {
                            // изменение цвета кнопки
                            $(element)
                                .closest("div[card]")
                                .find("#computation-button_set_price")
                                .removeClass("btn-changed")
                                .addClass("btn-stable");
                        }
                    }
                });
            }
        });

    // обработчик нажатия на кнопку применения новой цены для одного билета
    $("#loaded")
        .off("click", "#direct_variants #computation-button_set_price")
        .on(
            "click",
            "#direct_variants #computation-button_set_price",
            event => {
                if (window.identifier === "computation") {
                    // текущий элемент
                    let element = event.currentTarget,
                        // получение идентификатора варианта
                        variant = Number(
                            $(element)
                                .closest("div[variant]")
                                .attr("variant")
                                .trim()
                        ),
                        // получение идентификатора карты, с которой произошли изменения
                        card = Number(
                            $(element)
                                .closest("div[card]")
                                .attr("card")
                                .trim()
                        ),
                        // получение названия авиалинии карты, с которой произошли изменения
                        airline = String(
                            $(element)
                                .closest("div[card]")
                                .find("#airline")
                                .text()
                                .trim()
                        ),
                        // получение значения цены в милях, установленного пользователем
                        price_of_one_ticket = Number(
                            $(element)
                                .closest("div[card]")
                                .find("#price_of_one_ticket")
                                .val()
                                .trim()
                        ),
                        // функция возврата количества бонусов, которые остались доступны на карте после оплаты с карты поездки в другую сторону
                        getRemainingBonuses = (current_card, array) => {
                            // счётчик
                            let bonuses_used = 0;

                            array.forEach(card => {
                                if (
                                    Number(current_card.card_id) ===
                                    Number(card.card_id)
                                ) {
                                    bonuses_used += Number(
                                        Number(
                                            Number(card.tickets) *
                                                Number(card.price_of_one_ticket)
                                        )
                                    );
                                }
                            });

                            return Number(
                                Number(
                                    Number(current_card.params.bonus_cur) -
                                        Number(bonuses_used)
                                ) >= 0
                                    ? Number(
                                          Number(
                                              current_card.params.bonus_cur
                                          ) - Number(bonuses_used)
                                      )
                                    : 0
                            );
                        };

                    // обнуление информационных данных
                    window.data.modified_results.computation[
                        Number(variant)
                    ].direct.info.total_ticket_price_in_miles = 0;
                    window.data.modified_results.computation[
                        Number(variant)
                    ].direct.info.total_miles_available_on_all_cards = 0;
                    window.data.modified_results.computation[
                        Number(variant)
                    ].back.info.total_ticket_price_in_miles = 0;
                    window.data.modified_results.computation[
                        Number(variant)
                    ].back.info.total_miles_available_on_all_cards = 0;

                    // изменение данных в массиве вычисленных данных прямого рейса
                    window.data.modified_results.computation[
                        Number(variant)
                    ].direct.variants.forEach((card_computation, count) => {
                        if (
                            String(card_computation.airline) === String(airline)
                        ) {
                            // вычисление данных
                            card_computation.price_of_one_ticket = Number(
                                price_of_one_ticket
                            );
                        }

                        window.data.modified_results.computation[
                            Number(variant)
                        ].direct.info.total_ticket_price_in_miles += Number(
                            Number(card_computation.price_of_one_ticket) *
                                Number(card_computation.tickets)
                        );
                        window.data.modified_results.computation[
                            Number(variant)
                        ].direct.info.total_miles_available_on_all_cards += Number(
                            card_computation.params.bonus_cur
                        );
                    });

                    // изменение данных в массиве вычисленных данных обратного рейса
                    window.data.modified_results.computation[
                        Number(variant)
                    ].back.variants.forEach((card_computation, count) => {
                        window.data.modified_results.computation[
                            Number(variant)
                        ].back.info.total_ticket_price_in_miles += Number(
                            Number(card_computation.price_of_one_ticket) *
                                Number(card_computation.tickets)
                        );
                        window.data.modified_results.computation[
                            Number(variant)
                        ].back.info.total_miles_available_on_all_cards += Number(
                            getRemainingBonuses(
                                card_computation,
                                window.data.modified_results.computation[
                                    Number(variant)
                                ].direct.variants
                            )
                        );
                    });

                    // перезапись данных на странице для прямого рейса
                    window.data.modified_results.computation[
                        Number(variant)
                    ].direct.variants.forEach(card_computation => {
                        $(element)
                            .closest("div[variant]")
                            .children("#direct_variants")
                            .find(
                                "div[card='" +
                                    String(card_computation.card_id) +
                                    "']"
                            )
                            .each((count, card) => {
                                if (
                                    String(
                                        $(card)
                                            .find("#airline")
                                            .text()
                                            .trim()
                                    ) === String(card_computation.airline)
                                ) {
                                    $(card)
                                        .closest("div[card]")
                                        .find("#price_of_one_ticket")
                                        .val(
                                            Number(
                                                card_computation.price_of_one_ticket
                                            )
                                        );

                                    $(card)
                                        .closest("div[card]")
                                        .find("#number_of_tickets")
                                        .text(Number(card_computation.tickets));

                                    $(card)
                                        .closest("div[variant]")
                                        .children("#direct_info")
                                        .find("#price_miles")
                                        .text(
                                            Number(
                                                window.data.modified_results
                                                    .computation[
                                                    Number(variant)
                                                ].direct.info
                                                    .total_ticket_price_in_miles
                                            )
                                        );
                                    $(card)
                                        .closest("div[variant]")
                                        .children("#direct_info")
                                        .find("#available_miles")
                                        .text(
                                            Number(
                                                window.data.modified_results
                                                    .computation[
                                                    Number(variant)
                                                ].direct.info
                                                    .total_miles_available_on_all_cards
                                            )
                                        );
                                }
                            });
                    });

                    // перезапись данных на странице для обратного рейса
                    window.data.modified_results.computation[
                        Number(variant)
                    ].back.variants.forEach(card_computation => {
                        $(element)
                            .closest("div[variant]")
                            .children("#back_variants")
                            .find(
                                "div[card='" +
                                    String(card_computation.card_id) +
                                    "']"
                            )
                            .each((count, card) => {
                                if (
                                    String(
                                        $(card)
                                            .find("#airline")
                                            .text()
                                            .trim()
                                    ) === String(card_computation.airline)
                                ) {
                                    $(card)
                                        .closest("div[card]")
                                        .find("#price_of_one_ticket")
                                        .val(
                                            Number(
                                                card_computation.price_of_one_ticket
                                            )
                                        );

                                    $(card)
                                        .closest("div[card]")
                                        .find("#number_of_tickets")
                                        .text(Number(card_computation.tickets));
                                    $(card)
                                        .closest("div[variant]")
                                        .children("#back_info")
                                        .find("#price_miles")
                                        .text(
                                            Number(
                                                window.data.modified_results
                                                    .computation[
                                                    Number(variant)
                                                ].back.info
                                                    .total_ticket_price_in_miles
                                            )
                                        );
                                    $(card)
                                        .closest("div[variant]")
                                        .children("#back_info")
                                        .find("#available_miles")
                                        .text(
                                            Number(
                                                window.data.modified_results
                                                    .computation[
                                                    Number(variant)
                                                ].back.info
                                                    .total_miles_available_on_all_cards
                                            )
                                        );
                                }
                            });
                    });

                    // проверка на достаточное количество бонусо на карте, при отсутствии которых показывается уведомление
                    initializeNotifications(variant, element);

                    // изменение цвета кнопки
                    $(element)
                        .closest("div[card]")
                        .find("#computation-button_set_price")
                        .removeClass("btn-changed")
                        .addClass("btn-stable");
                }
            }
        );

    // обработчик нажатия на кнопку применения новой цены для одного билета в обратную сторону
    $("#loaded")
        .off("click", "#back_variants #computation-button_set_price")
        .on("click", "#back_variants #computation-button_set_price", event => {
            if (window.identifier === "computation") {
                // текущий элемент
                let element = event.currentTarget,
                    // получение идентификатора варианта
                    variant = Number(
                        $(element)
                            .closest("div[variant]")
                            .attr("variant")
                            .trim()
                    ),
                    // получение идентификатора карты, с которой произошли изменения
                    card = Number(
                        $(element)
                            .closest("div[card]")
                            .attr("card")
                            .trim()
                    ),
                    // получение названия авиалинии карты, с которой произошли изменения
                    airline = String(
                        $(element)
                            .closest("div[card]")
                            .find("#airline")
                            .text()
                            .trim()
                    ),
                    // получение значения цены в милях, установленного пользователем
                    price_of_one_ticket = Number(
                        $(element)
                            .closest("div[card]")
                            .find("#price_of_one_ticket")
                            .val()
                            .trim()
                    ),
                    // функция возврата количества бонусов, которые остались доступны на карте после оплаты с карты поездки в другую сторону
                    getRemainingBonuses = (current_card, array) => {
                        // счётчик
                        let bonuses_used = 0;

                        array.forEach(card => {
                            if (
                                Number(current_card.card_id) ===
                                Number(card.card_id)
                            ) {
                                bonuses_used += Number(
                                    Number(
                                        Number(card.tickets) *
                                            Number(card.price_of_one_ticket)
                                    )
                                );
                            }
                        });

                        return Number(
                            Number(
                                Number(current_card.params.bonus_cur) -
                                    Number(bonuses_used)
                            ) >= 0
                                ? Number(
                                      Number(current_card.params.bonus_cur) -
                                          Number(bonuses_used)
                                  )
                                : 0
                        );
                    };

                // обнуление информационных данных
                window.data.modified_results.computation[
                    Number(variant)
                ].direct.info.total_ticket_price_in_miles = 0;
                window.data.modified_results.computation[
                    Number(variant)
                ].direct.info.total_miles_available_on_all_cards = 0;
                window.data.modified_results.computation[
                    Number(variant)
                ].back.info.total_ticket_price_in_miles = 0;
                window.data.modified_results.computation[
                    Number(variant)
                ].back.info.total_miles_available_on_all_cards = 0;

                // изменение данных в массиве вычисленных данных прямого рейса
                window.data.modified_results.computation[
                    Number(variant)
                ].direct.variants.forEach((card_computation, count) => {
                    window.data.modified_results.computation[
                        Number(variant)
                    ].direct.info.total_ticket_price_in_miles += Number(
                        Number(card_computation.price_of_one_ticket) *
                            Number(card_computation.tickets)
                    );
                    window.data.modified_results.computation[
                        Number(variant)
                    ].direct.info.total_miles_available_on_all_cards += Number(
                        card_computation.params.bonus_cur
                    );
                });

                // изменение данных в массиве вычисленных данных обратного рейса
                window.data.modified_results.computation[
                    Number(variant)
                ].back.variants.forEach((card_computation, count) => {
                    if (String(card_computation.airline) === String(airline)) {
                        // вычисление данных
                        card_computation.price_of_one_ticket = Number(
                            price_of_one_ticket
                        );
                    }

                    window.data.modified_results.computation[
                        Number(variant)
                    ].back.info.total_ticket_price_in_miles += Number(
                        Number(card_computation.price_of_one_ticket) *
                            Number(card_computation.tickets)
                    );
                    window.data.modified_results.computation[
                        Number(variant)
                    ].back.info.total_miles_available_on_all_cards += Number(
                        getRemainingBonuses(
                            card_computation,
                            window.data.modified_results.computation[
                                Number(variant)
                            ].direct.variants
                        )
                    );
                });

                // перезапись данных на странице для прямого рейса
                window.data.modified_results.computation[
                    Number(variant)
                ].direct.variants.forEach(card_computation => {
                    $(element)
                        .closest("div[variant]")
                        .children("#direct_variants")
                        .find(
                            "div[card='" +
                                String(card_computation.card_id) +
                                "']"
                        )
                        .each((count, card) => {
                            if (
                                String(
                                    $(card)
                                        .find("#airline")
                                        .text()
                                        .trim()
                                ) === String(card_computation.airline)
                            ) {
                                $(card)
                                    .closest("div[card]")
                                    .find("#price_of_one_ticket")
                                    .val(
                                        Number(
                                            card_computation.price_of_one_ticket
                                        )
                                    );

                                $(card)
                                    .closest("div[card]")
                                    .find("#number_of_tickets")
                                    .text(Number(card_computation.tickets));

                                $(card)
                                    .closest("div[variant]")
                                    .children("#direct_info")
                                    .find("#price_miles")
                                    .text(
                                        Number(
                                            window.data.modified_results
                                                .computation[Number(variant)]
                                                .direct.info
                                                .total_ticket_price_in_miles
                                        )
                                    );
                                $(card)
                                    .closest("div[variant]")
                                    .children("#direct_info")
                                    .find("#available_miles")
                                    .text(
                                        Number(
                                            window.data.modified_results
                                                .computation[Number(variant)]
                                                .direct.info
                                                .total_miles_available_on_all_cards
                                        )
                                    );
                            }
                        });
                });

                // перезапись данных на странице для обратного рейса
                window.data.modified_results.computation[
                    Number(variant)
                ].back.variants.forEach(card_computation => {
                    $(element)
                        .closest("div[variant]")
                        .children("#back_variants")
                        .find(
                            "div[card='" +
                                String(card_computation.card_id) +
                                "']"
                        )
                        .each((count, card) => {
                            if (
                                String(
                                    $(card)
                                        .find("#airline")
                                        .text()
                                        .trim()
                                ) === String(card_computation.airline)
                            ) {
                                $(card)
                                    .closest("div[card]")
                                    .find("#price_of_one_ticket")
                                    .val(
                                        Number(
                                            card_computation.price_of_one_ticket
                                        )
                                    );

                                $(card)
                                    .closest("div[card]")
                                    .find("#number_of_tickets")
                                    .text(Number(card_computation.tickets));
                                $(card)
                                    .closest("div[variant]")
                                    .children("#back_info")
                                    .find("#price_miles")
                                    .text(
                                        Number(
                                            window.data.modified_results
                                                .computation[Number(variant)]
                                                .back.info
                                                .total_ticket_price_in_miles
                                        )
                                    );
                                $(card)
                                    .closest("div[variant]")
                                    .children("#back_info")
                                    .find("#available_miles")
                                    .text(
                                        Number(
                                            window.data.modified_results
                                                .computation[Number(variant)]
                                                .back.info
                                                .total_miles_available_on_all_cards
                                        )
                                    );
                            }
                        });
                });

                // проверка на достаточное количество бонусо на карте, при отсутствии которых показывается уведомление
                initializeNotifications(variant, element);

                // изменение цвета кнопки
                $(element)
                    .closest("div[card]")
                    .find("#computation-button_set_price")
                    .removeClass("btn-changed")
                    .addClass("btn-stable");
            }
        });
});

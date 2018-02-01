/* ОБРАБОТЧИКИ ИНТЕРФЕЙСА */

$(document).ready(() => {
    // обработчик нажатия на заголовок карточки
    $("#loaded")
        .off("click", ".card-header")
        .on("click", ".card-header", event => {
            if (
                $($(event.currentTarget).parent())
                    .find(".card-body")
                    .is(":hidden")
            ) {
                $($(event.currentTarget).parent())
                    .find(".card-body")
                    .show();
            } else {
                $($(event.currentTarget).parent())
                    .find(".card-body")
                    .hide();
            }
        });

    // обработчик нажатия на логотип страницы
    $("#loaded")
        .off("click", ".logo")
        .on("click", ".logo", () => {
            if (window.identifier !== "airports") {
                showPageAirports();
            }
        });
});

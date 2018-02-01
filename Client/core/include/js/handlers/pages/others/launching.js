/* ОБРАБОТЧИКИ ЗАПУСКА */

$(document).ready(() => {
    // заполнение списка с выбором минимального количества пассажиров
    function othersPassengersInit() {
        // проверка соответствие обработчика со страницей
        if (window.identifier === "others") {
            // очистка списков
            $("#others-passengers_min, #others-passengers_max").empty();

            let count;
            for (count = 0; count <= 5; count += 1) {
                $("#others-passengers_min, #others-passengers_max").append(
                    "<option value='" + count + "'>" + count + "</option>"
                );
            }

            // показ обработанного содержимого
            $("#others-passengers_min, #others-passengers_max").show();
        }
    }

    // инициализация списков
    othersPassengersInit();

    // запрос от сервера списка всех семейных положений
    window.socket.emit("others_get");
});

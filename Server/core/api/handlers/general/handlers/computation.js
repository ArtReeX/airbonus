/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.get = function (socket, config, methods, database, log, async) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод computation_get.");
    
    methods.computation.get(config, socket.session, database, log, async, function (result_error, result_data) {

        // переменные для хранения
        var message,
            cards_count,
            variant_count,
            converted_count,
            cards_id = [];

        // изменение количества отдаваемых результатов
        if (result_data.results.length > config.max_variants) { result_data.results.length = config.max_variants; }

        // создание независимой копии массива
        result_data = JSON.parse(JSON.stringify(result_data));

        // проверка карт на повторения
        for (cards_count = 0; cards_count < result_data.results.length; cards_count += 1) {

            // проверка главных карт
            for (variant_count = 0; variant_count < result_data.results[cards_count].variant.length; variant_count += 1) {

                if (cards_id.indexOf(Number(result_data.results[cards_count].variant[variant_count].card_id)) === -1) {
                    cards_id.push(Number(result_data.results[cards_count].variant[variant_count].card_id));
                } else {
                    result_data.results[cards_count].variant[variant_count].card += " (Same card)";
                    result_data.results[cards_count].variant[variant_count].fee1 = result_data.results[cards_count].variant[variant_count].amount = "-";
                }

                // проверка на имеющуюся карту
                if (result_data.results[cards_count].variant[variant_count].have) {
                    result_data.results[cards_count].variant[variant_count].fee1 = result_data.results[cards_count].variant[variant_count].amount = "-";
                }


                // проверка используемых для преобразования карт
                for (converted_count = 0; converted_count < result_data.results[cards_count].variant[variant_count].converted_cards.length; converted_count += 1) {

                    if (cards_id.indexOf(Number(result_data.results[cards_count].variant[variant_count].converted_cards[converted_count].params.card_id)) === -1) {
                        cards_id.push(Number(result_data.results[cards_count].variant[variant_count].converted_cards[converted_count].params.card_id));
                    } else {

                        result_data.results[cards_count].variant[variant_count].converted_cards[converted_count].card.name += " (Same card)";
                        result_data.results[cards_count].variant[variant_count].converted_cards[converted_count].params.fee1 = result_data.results[cards_count].variant[variant_count].converted_cards[converted_count].params.amount = "-";

                    }

                    // проверка на имеющуюся карту
                    if (result_data.results[cards_count].variant[variant_count].converted_cards[converted_count].card.have) {
                        result_data.results[cards_count].variant[variant_count].converted_cards[converted_count].params.fee1 = result_data.results[cards_count].variant[variant_count].converted_cards[converted_count].params.amount = "-";
                    }

                }


            }

            // очистка идентификаторов повторяющихся карт
            cards_id.splice(0, cards_id.length);

        }

        // формирование пакета для отправки
        message = {
            "error": result_error ? { "type": result_error } : null,
            "data": { "computation" : result_data.results, "number_of_cards" : result_data.number_of_cards, "treated_combinations" : result_data.treated_combinations }
        };

        // отправка результата
        log.trace("Отправка результата computation_get методом computation_get пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("computation_get", message);

    });
    
};
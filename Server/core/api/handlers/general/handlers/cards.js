/* ОБРАБОТЧИК ДЛЯ API */

module.exports.getAll = async (socket, methods, database, log) => {
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод cards_get_all.");

    let message = {
        error: null,
        data: null
    };

    try {
        let result = await methods.cards.getAll(database);

        message.data = { cards: result };
    } catch (error) {
        log.error("Ошибка базы данных. " + error);
        message.error = { type: "database" };
    }

    // отправка результата
    log.trace(
        "Отправка результата cards_get_all методом cards_get_all пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("cards_get_all", message);

    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод cards_get_all.");
};

module.exports.getAmEx = async (socket, methods, database, log) => {
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод cards_get_amEx.");

    let message = {
            error: null,
            data: null
        },
        cards_all_count,
        cards_amex_count;

    try {
        let result = await methods.cards.getAmEx(database);

        // исключение карт, которые уже отмечены во всех картах
        for (
            cards_all_count = 0;
            cards_all_count < socket.session.allCards.length;
            cards_all_count += 1
        ) {
            for (
                cards_amex_count = 0;
                cards_amex_count < result.length;
                cards_amex_count += 1
            ) {
                if (
                    Number(socket.session.allCards[cards_all_count].card) ===
                    Number(result[cards_amex_count].id)
                ) {
                    result.splice(cards_amex_count, 1);
                }
            }
        }

        message.data = { cards: result };
    } catch (error) {
        log.error("Ошибка базы данных. " + error);
        message.error = { type: "database" };
    }

    // отправка результата
    log.trace(
        "Отправка результата cards_get_amEx методом cards_get_amEx пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("cards_get_amEx", message);
};

module.exports.setAll = (socket, params, methods, log) => {
    // запись сообщения клиента в отладку
    log.info(
        "Пользователь " +
            socket.id +
            " вызвал метод cards_set_all параметрами: " +
            params
    );

    socket.session.allCards = params.cards;

    // формирование пакета для отправки
    let message = {
        error: null,
        data: { next: true }
    };

    // отправка результата
    log.trace(
        "Отправка результата cards_set_all методом cards_set_all пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("cards_set_all", message);
};

module.exports.setAmEx = (socket, params, methods, log) => {
    // запись сообщения клиента в отладку
    log.info(
        "Пользователь " +
            socket.id +
            " вызвал метод cards_set_amEx параметрами: " +
            params
    );

    socket.session.amExCards = params.cards;

    // формирование пакета для отправки
    let message = {
        error: null,
        data: { next: true }
    };

    // отправка результата
    log.trace(
        "Отправка результата cards_set_amEx методом cards_set_amEx пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("cards_set_amEx", message);
};

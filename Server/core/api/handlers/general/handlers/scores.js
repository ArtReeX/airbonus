/* ОБРАБОТЧИК ДЛЯ API */

module.exports.get = async (socket, methods, database, log) => {
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод scores_get.");

    let message = {
        error: null,
        data: null
    };

    try {
        let result = await methods.scores.getAll(database);

        // изменение крайних значений
        if (result.length) {
            result[result.length - 1].max = "∞";
        }

        // формирование пакета для отправки
        message.data = { scores: result };
    } catch (error) {
        log.error("Ошибка базы данных. " + error);
        message.error = { type: "database" };
    }

    // отправка результата
    log.trace(
        "Отправка результата scores_get методом scores_get пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("scores_get", message);

    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод scores_get.");
};

module.exports.set = async (socket, params, methods, database, log) => {
    // запись сообщения клиента в отладку
    log.info(
        "Пользователь " +
            socket.id +
            " вызвал метод scores_set с параметрами: " +
            params
    );

    let message = {
        error: null,
        data: null
    };

    try {
        let result = await methods.scores.getById(params, database);

        if (result.max <= socket.session.consts.creditMin) {
            // формирование пакета для отправки
            message.error = { type: "paucity" };
        } else {
            socket.session.creditScoreMin = result.min;
            socket.session.creditScoreMax = result.max;

            // формирование пакета для отправки
            message.data = { next: true };
        }
    } catch (error) {
        log.error("Ошибка базы данных. " + error);
        message.error = { type: "database" };
    }

    // отправка результата
    log.trace(
        "Отправка результата scores_set методом scores_set пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("scores_set", message);
};

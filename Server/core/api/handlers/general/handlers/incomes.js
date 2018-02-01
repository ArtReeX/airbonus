/* ОБРАБОТЧИК ДЛЯ API */

module.exports.get = async (socket, methods, database, log) => {
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод incomes_get.");

    let message = {
        error: null,
        data: null
    };

    try {
        let result = await methods.incomes.getAll(database);

        // изменение крайних значений
        if (result.length) {
            result[result.length - 1].max = "∞";
        }

        // формирование пакета для отправки
        message.data = { incomes: result };
    } catch (error) {
        log.error("Ошибка базы данных. " + error);
        message.error = { type: "database" };
    }

    // отправка результата
    log.trace(
        "Отправка результата incomes_get методом incomes_get пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("incomes_get", message);
};

module.exports.set = async (socket, params, methods, database, log) => {
    // запись сообщения клиента в отладку
    log.info(
        "Пользователь " +
            socket.id +
            " вызвал метод incomes_set с параметрами: " +
            params
    );

    let message = {
        error: null,
        data: null
    };

    try {
        let result = await methods.incomes.getById(params, database);

        if (
            result.max <= socket.session.consts.incomeMin ||
            socket.session.creditScoreMin < result.min_credit_score
        ) {
            // формирование пакета для отправки
            message.error = { type: "paucity" };
        } else {
            socket.session.incomeMin = result.min;
            socket.session.incomeMax = result.max;

            // формирование пакета для отправки
            message.data = { next: true };
        }
    } catch (error) {
        log.error("Ошибка базы данных. " + error);
        message.error = { type: "database" };
    }

    // отправка результата
    log.trace(
        "Отправка результата incomes_set методом incomes_set пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("incomes_set", message);
};

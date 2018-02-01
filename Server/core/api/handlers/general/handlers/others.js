/* ОБРАБОТЧИК ДЛЯ API */

module.exports.get = async (socket, methods, database, log) => {
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод others_get.");

    let message = {
        error: null,
        data: null
    };

    try {
        let result = await methods.statuses.get(database);

        message.data = { statuses: result };
    } catch (error) {
        log.error("Ошибка базы данных. " + error);
        message.error = { type: "database" };
    }

    // отправка результата
    log.trace(
        "Отправка результата others_get методом others_get пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("others_get", message);
};

module.exports.set = (socket, params, methods, log) => {
    // запись сообщения клиента в отладку
    log.info(
        "Пользователь " +
            socket.id +
            " вызвал метод others_set параметрами: " +
            params
    );

    // переменные для хранения
    let message;

    if (
        Number(params.params.spendNextYear) <
        Number(params.params.spendNextMonth)
    ) {
        // формирование пакета для отправки
        message = {
            error: { type: "annual_less_monthly" },
            data: null
        };
    } else if (
        Boolean(Number(params.params.spendNextYear)) === false ||
        Boolean(Number(params.params.spendNextMonth)) === false
    ) {
        // формирование пакета для отправки
        message = {
            error: { type: "empty_memo" },
            data: null
        };
    } else {
        socket.session.statusValue = Number(params.params.statusValue);

        socket.session.minPeople = Number(params.params.minPeople);
        socket.session.maxPeople = Number(params.params.maxPeople);

        socket.session.spendNextMonth = Number(params.params.spendNextMonth);
        socket.session.spendNextYear = Number(params.params.spendNextYear);

        // формирование пакета для отправки
        message = {
            error: null,
            data: { next: true }
        };
    }

    // отправка результата
    log.trace(
        "Отправка результата others_set методом others_set пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("others_set", message);
};

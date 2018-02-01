/* ОБРАБОТЧИК ДЛЯ API */

module.exports.getFrom = async (socket, params, methods, database, log) => {
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод airports_get_from.");

    let message = {
        error: null,
        data: null
    };

    try {
        let result = await methods.airports.getByLine(params, database);

        message.data = { airports: result };
    } catch (error) {
        log.error("Ошибка базы данных. " + error);
        message.error = { type: "database" };
    }

    // отправка результата
    log.trace(
        "Отправка результата airports_get_from методом airports_get_from пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("airports_get_from", message);
};

module.exports.getTo = async (socket, params, methods, database, log) => {
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод airports_get_to.");

    let message = {
        error: null,
        data: null
    };

    try {
        let result = await methods.airports.getByLine(params, database);

        message.data = { airports: result };
    } catch (error) {
        log.error("Ошибка базы данных. " + error);
        message.error = { type: "database" };
    }

    // отправка результата
    log.trace(
        "Отправка результата airports_get_to методом airports_get_to пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("airports_get_to", message);
};

module.exports.set = async (socket, params, methods, database, log) => {
    // запись сообщения клиента в отладку
    log.info(
        "Пользователь " +
            socket.id +
            " вызвал метод airports_set с параметрами: " +
            params
    );

    // переменные для хранения
    let airports = [],
        airports_count,
        message = {
            error: null,
            data: null
        };

    try {
        let result = await methods.airports.getAll(params, database);

        // перезапись IATA-кодов а массив
        for (
            airports_count = 0;
            airports_count < result.length;
            airports_count += 1
        ) {
            airports.push(result[airports_count].iata);
        }

        // ОБРАБОТКА ОТВЕТОВ

        if (
            airports.indexOf(String(params.from)) === -1 ||
            airports.indexOf(String(params.to)) === -1
        ) {
            // формирование пакета для отправки
            message.error = { type: "no_exist_airport" };
        } else if (String(params.from) === String(params.to)) {
            // формирование пакета для отправки
            message.error = { type: "same_airports" };
        } else {
            socket.session.userAirportFrom = String(params.from);
            socket.session.userAirportTo = String(params.to);

            // формирование пакета для отправки
            message.data = { next: true };
        }
    } catch (error) {
        log.error("Ошибка базы данных. " + error);
        message.error = { type: "database" };
    }

    // отправка результата
    log.trace(
        "Отправка результата airports_set методом airports_set пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("airports_set", message);
};

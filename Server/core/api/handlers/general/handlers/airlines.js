/* ОБРАБОТЧИК ДЛЯ API */

module.exports.get = async (socket, methods, database, log) => {
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод airlines_get.");

    let message = {
        error: null,
        data: null
    };

    try {
        let result = await methods.airlines.get(
            {
                from: socket.session.userAirportFrom,
                to: socket.session.userAirportTo
            },
            database
        );

        message.data = { airlines: result };
    } catch (error) {
        log.error("Ошибка базы данных. " + error);
        message.error = { type: "database" };
    }

    // отправка результата
    log.trace(
        "Отправка результата airlines_get методом airlines_get пользователю " +
            socket.id +
            ":"
    );
    log.trace(message);

    socket.emit("airlines_get", message);
};

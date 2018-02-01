/* API */

const handlersModule = require("./api/handlers"),
    parametersModule = require("./api/parameters");

module.exports.set = async (config, websocket, database, log, async) => {
    try {
        websocket.sockets.on("connection", async socket_client => {
            // логгирование
            log.info(
                "Пользователь " +
                    socket_client.id +
                    ", IP: " +
                    socket_client.request.connection.remoteAddress +
                    " подключился."
            );

            // установка обработчиков стандартных событий
            await handlersModule.standart.set(socket_client, log);

            // установка структуры параметров пользователя
            socket_client.session = await JSON.parse(
                await JSON.stringify(parametersModule)
            );

            // установка обработчиков клиентских событий
            await handlersModule.general.set(
                config,
                socket_client,
                database,
                log,
                async
            );
        });
    } catch (error) {
        throw new Error(error);
    }
};

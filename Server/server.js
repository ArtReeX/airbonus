/* СЕРВЕР */

// подключение модулей
const asyncModule = require("async"),
    configModule = require("./config"),
    logModule = require("./core/log"),
    databaseModule = require("./core/database"),
    expressModule = require("./core/express"),
    ioModule = require("socket.io"),
    apiModule = require("./core/api");

(async () => {
    try {
        // логгер
        const log = await logModule.create(configModule.log);

        // база данных
        const database = await databaseModule.create(configModule.database);

        // создание сервера
        const app = await expressModule.create(configModule.server);

        // подключение WEB-сокетов
        const websocket = await ioModule.listen(app, configModule.websocket);

        // установка обработчиков
        await apiModule.set(
            configModule.calculate,
            websocket,
            database,
            log,
            asyncModule
        );

        log.info("Сервер успешно запущен.");
    } catch (error) {
        console.error("Не удалось запустить сервер. " + error);
    }
})();

/* EXPRESS */

const http_module = require("http"),
    express_module = require("express");

module.exports.create = async config => {
    const express = express_module(),
        app = http_module.createServer(express);

    try {
        // открытие доступа извне к директории на сервере
        await express.use(express_module["static"](config.files_directory));

        // начало прослушивание порта
        await app.listen(config.port);

        return app;
    } catch (error) {
        throw new Error(error);
    }
};

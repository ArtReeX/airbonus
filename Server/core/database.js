/* БАЗА ДАННЫХ */

const mysqlModule = require("promise-mysql");

module.exports.create = async config => {
    try {
        // создание подключения с параметрами
        const pool = await mysqlModule.createPool(config);

        // проверка подключения
        await pool.getConnection();

        return pool;
    } catch (error) {
        throw new Error(error);
    }
};

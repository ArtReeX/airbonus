/* МЕТОД ДЛЯ ОБРАБОТЧИКОВ API */

module.exports.getAll = async (params, database) => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT iata, airport_name, city FROM my_airports ORDER BY iata"
        );

        connection.release();

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports.getByLine = async (params, database) => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = connection.query(
            "SELECT iata, airport_name, city FROM my_airports WHERE iata RLIKE ? OR city RLIKE ? OR airport_name RLIKE ? ORDER BY iata",
            ["^" + params.line, "^" + params.line, "^" + params.line]
        );

        connection.release();

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

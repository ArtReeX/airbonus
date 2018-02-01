/* МЕТОД ДЛЯ ОБРАБОТЧИКОВ API */

module.exports.getAll = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT id, min, max from income ORDER BY min"
        );

        connection.release();

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports.getById = async (params, database) => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT min, max, min_credit_score FROM income WHERE id = ? LIMIT 1",
            [params.id]
        );

        connection.release();

        return {
            min: result[0].min,
            max: result[0].max,
            min_credit_score: result[0].min_credit_score
        };
    } catch (error) {
        throw new Error(error);
    }
};

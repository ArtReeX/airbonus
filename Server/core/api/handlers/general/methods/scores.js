/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
module.exports.getAll = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT id, min, max from credit_score ORDER BY min"
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
            "SELECT min, max FROM credit_score WHERE id = ? LIMIT 1",
            [params.id]
        );

        connection.release();

        return {
            min: result[0].min,
            max: result[0].max
        };
    } catch (error) {
        throw new Error(error);
    }
};

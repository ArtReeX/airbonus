/* МЕТОД ДЛЯ ОБРАБОТЧИКОВ API */

module.exports.get = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT id, name, value FROM marital_status ORDER BY name"
        );

        connection.release();

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

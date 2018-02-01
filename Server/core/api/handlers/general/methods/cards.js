/* МЕТОД ДЛЯ ОБРАБОТЧИКОВ API */

module.exports.getAll = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT id, name, image FROM cards ORDER BY name"
        );

        connection.release();

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports.getAmEx = async (database, callback) => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = connection.query(
            "SELECT cards.id, cards.name, cards.image FROM cards, consts WHERE cards.bank_id = consts.value AND consts.name = ?",
            ["AmEx_Bank_ID"]
        );

        connection.release();

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

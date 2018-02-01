/* МЕТОД ДЛЯ ОБРАБОТЧИКОВ API */

module.exports.get = async (params, database) => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT airlines.name FROM airlines, routes_per_region WHERE airlines.iata = routes_per_region.airline_iata AND routes_per_region.source = ? AND routes_per_region.destination = ?",
            [params.from, params.to]
        );

        connection.release();

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

/* МЕТОД ДЛЯ ОБРАБОТЧИКОВ API */

module.exports.creditMin = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT value FROM consts WHERE name = ?",
            ["Min_Credit_Score"]
        );

        connection.release();

        return result[0].value;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports.incomeMin = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT value FROM consts WHERE name = ?",
            ["Min_Income"]
        );

        connection.release();

        return result[0].value;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports.twoStageSorting = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT value FROM consts WHERE name = ?",
            ["Two_Stage_Sorting"]
        );

        connection.release();

        return result[0].value;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports.recursionDepthComputation = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT developer_options.value FROM developer_options WHERE developer_options.option = ?",
            ["recursion_depth_computation"]
        );

        connection.release();

        return result[0].value;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports.maxVariantsRecursionComputation = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT developer_options.value FROM developer_options WHERE developer_options.option = ?",
            ["max_variants_recursion_computation"]
        );

        connection.release();

        return result[0].value;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports.recursionDepthConversion = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT developer_options.value FROM developer_options WHERE developer_options.option = ?",
            ["recursion_depth_conversion"]
        );

        connection.release();

        return result[0].value;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports.maxVariantsRecursionConversion = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT developer_options.value FROM developer_options WHERE developer_options.option = ?",
            ["max_variants_recursion_conversion"]
        );

        connection.release();

        return result[0].value;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports.maxVariants = async database => {
    try {
        // получение соединения
        const connection = await database.getConnection();

        // узнаём идентификаторы всех авиалиний из рейсов
        let result = await connection.query(
            "SELECT developer_options.value FROM developer_options WHERE developer_options.option = ?",
            ["max_variants"]
        );

        connection.release();

        return result[0].value;
    } catch (error) {
        throw new Error(error);
    }
};

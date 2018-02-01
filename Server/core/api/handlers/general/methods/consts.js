/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
module.exports.creditMin = function(database, callback) {
    "use strict";

    // получение соединения
    database.getConnection(function(error, connection) {
        if (error) {
            // возврат результата
            callback({ type: "database" }, null);
        } else {
            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query(
                "SELECT value FROM consts WHERE name = ?",
                ["Min_Credit_Score"],
                function(error, values) {
                    if (error) {
                        callback({ type: "database" }, null);
                    } else {
                        callback(null, Number(values[0].value));
                    }
                }
            );
        }

        // закрытие соединения
        connection.release();
    });
};

module.exports.incomeMin = function(database, callback) {
    "use strict";

    // получение соединения
    database.getConnection(function(error, connection) {
        if (error) {
            // возврат результата
            callback({ type: "database" }, null);
        } else {
            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query(
                "SELECT value FROM consts WHERE name = ?",
                ["Min_Income"],
                function(error, values) {
                    if (error) {
                        callback({ type: "database" }, null);
                    } else {
                        callback(null, Number(values[0].value));
                    }
                }
            );
        }

        // закрытие соединения
        connection.release();
    });
};

module.exports.twoStageSorting = function(database, callback) {
    "use strict";

    // получение соединения
    database.getConnection(function(error, connection) {
        if (error) {
            // возврат результата
            callback({ type: "database" }, null);
        } else {
            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query(
                "SELECT value FROM consts WHERE name = ?",
                ["Two_Stage_Sorting"],
                function(error, values) {
                    if (error) {
                        callback({ type: "database" }, null);
                    } else {
                        callback(null, Number(values[0].value));
                    }
                }
            );
        }

        // закрытие соединения
        connection.release();
    });
};

module.exports.recursionDepthComputation = function(database, callback) {
    "use strict";

    // получение соединения
    database.getConnection(function(error, connection) {
        if (error) {
            // возврат результата
            callback({ type: "database" }, null);
        } else {
            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query(
                "SELECT developer_options.value FROM developer_options WHERE developer_options.option = ?",
                ["recursion_depth_computation"],
                function(error, values) {
                    if (error) {
                        callback({ type: "database" }, null);
                    } else {
                        callback(null, Number(values[0].value));
                    }
                }
            );
        }

        // закрытие соединения
        connection.release();
    });
};

module.exports.maxVariantsRecursionComputation = function(database, callback) {
    "use strict";

    // получение соединения
    database.getConnection(function(error, connection) {
        if (error) {
            // возврат результата
            callback({ type: "database" }, null);
        } else {
            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query(
                "SELECT developer_options.value FROM developer_options WHERE developer_options.option = ?",
                ["max_variants_recursion_computation"],
                function(error, values) {
                    if (error) {
                        callback({ type: "database" }, null);
                    } else {
                        callback(null, Number(values[0].value));
                    }
                }
            );
        }

        // закрытие соединения
        connection.release();
    });
};

module.exports.recursionDepthConversion = function(database, callback) {
    "use strict";

    // получение соединения
    database.getConnection(function(error, connection) {
        if (error) {
            // возврат результата
            callback({ type: "database" }, null);
        } else {
            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query(
                "SELECT developer_options.value FROM developer_options WHERE developer_options.option = ?",
                ["recursion_depth_conversion"],
                function(error, values) {
                    if (error) {
                        callback({ type: "database" }, null);
                    } else {
                        callback(null, Number(values[0].value));
                    }
                }
            );
        }

        // закрытие соединения
        connection.release();
    });
};

module.exports.maxVariantsRecursionConversion = function(database, callback) {
    "use strict";

    // получение соединения
    database.getConnection(function(error, connection) {
        if (error) {
            // возврат результата
            callback({ type: "database" }, null);
        } else {
            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query(
                "SELECT developer_options.value FROM developer_options WHERE developer_options.option = ?",
                ["max_variants_recursion_conversion"],
                function(error, values) {
                    if (error) {
                        callback({ type: "database" }, null);
                    } else {
                        callback(null, Number(values[0].value));
                    }
                }
            );
        }

        // закрытие соединения
        connection.release();
    });
};

module.exports.maxVariants = function(database, callback) {
    "use strict";

    // получение соединения
    database.getConnection(function(error, connection) {
        if (error) {
            // возврат результата
            callback({ type: "database" }, null);
        } else {
            // узнаём идентификаторы всех авиалиний из рейсов
            connection.query(
                "SELECT developer_options.value FROM developer_options WHERE developer_options.option = ?",
                ["max_variants"],
                function(error, values) {
                    if (error) {
                        callback({ type: "database" }, null);
                    } else {
                        callback(null, Number(values[0].value));
                    }
                }
            );
        }

        // закрытие соединения
        connection.release();
    });
};

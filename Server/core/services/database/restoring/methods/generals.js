/*global require, module*/

/*-------------- ЗАГОЛОВКИ ------------------*/
var methods_module = require("./generals/methods");

/*-------------- ВОССТАНОВЛЕНИЕ ОСНОВНЫХ ТАБЛИЦ БАЗЫ ДАННЫХ ------------------*/
module.exports = function(database, async, callback) {
    "use strict";

    async.series(
        [
            // test_table
            function(done) {
                // проверка существования таблицы
                methods_module.test_table.check(database, function(
                    error,
                    result_exist
                ) {
                    if (error) {
                        done(error);
                    } else {
                        if (result_exist) {
                            done();
                        } else {
                            // создание таблицы
                            methods_module.test_table.create(database, function(
                                error
                            ) {
                                if (error) {
                                    done(error);
                                } else {
                                    // восстановление данных таблицы
                                    methods_module.test_table.fill(
                                        database,
                                        function(error) {
                                            if (error) {
                                                done(error);
                                            } else {
                                                done();
                                            }
                                        }
                                    );
                                }
                            });
                        }
                    }
                });
            }
        ],
        function(error) {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        }
    );
};

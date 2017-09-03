/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var config_module = require('../config');
var log_module = require('./log');
var functions_module = require('./functions');
var http_module = require('http');
var express_module = require('express');
var io_module = require('socket.io');
var sql_module = require('mssql');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*-------------------------- WS-СЕРВЕР -----------------------------*/
var WS = function (callback) {
    'use strict';

    // СОЗДАНИЕ КЛИЕНТА SQL
    var sql_client = new sql_module.ConnectionPool(config_module.sql, function (error) {

        if (error) {

            // обработка ошибок
            log.fatal("Error connecting to SQL database: " + error);
            callback(new Error());
            return;

        } else {
            
            // НАСТРОЙКА ОБРАБОТЧИКА ОШИБОК SQL
            sql_client.on('error', function (error) {
                log.fatal("Error SQL database: " + error);
            });

            // СОЗДАНИЕ СЕРВЕРА
            var express = express_module(),
                app = http_module.createServer(express),
                io_serv = io_module.listen(app, config_module.server.options);

            // открытие доступа извне к директории на сервере
            express.use(express_module['static'](config_module.dir.files_directory));

            // начало прослушивание порта
            app.listen(config_module.server.port, function (error) {

                if (error) {

                    // обработка ошибок
                    log.fatal("Could not create WS connection: " + error);
                    callback(new Error());
                    return;

                } else {

                    // основная часть
                    log.debug("The server started on port " + config_module.server.port + ".");
                    callback();

                    // установка обработчиков
                    io_serv.sockets.on('connection', function (socket) {

                        // подключение клиента
                        log.info("User " + socket.id + ", IP: " + socket.request.connection.remoteAddress + " connected.");


                        //************ параметры пользователя **************//
                        socket.session = {
                            userAirportTo: null,
                            userAirportFrom: null,
                            creditScoreMin: null,
                            creditScoreMax: null,
                            incomeMin: null,
                            incomeMax: null,
                            cardCount: null,
                            allCards: null,
                            amExCards: null,
                            statusValue: null,
                            minPeople: null,
                            maxPeople: null,
                            spendNextMonth: null,
                            spendNextYear: null
                        };
                        //**************************************************//


                        //************ разбор сообщений от клиентов **************//


                        // ОБРАБОТЧИК ЗАПРОСА ИСХОДЯЩИХ АЭРОПОРТОВ
                        socket.on('getAirportsFrom', function (message) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method getAirportsFrom with param line: " + message.line);

                            functions_module.getAirportsByLine(sql_client, config_module.sql.database, message.line, function (airports) {

                                // формирование пакета для отправки
                                var answer = {
                                    'result': airports,
                                    'error': null
                                };

                                // отправка результата
                                log.trace("Send to " + socket.id + ":");
                                log.trace(answer);

                                socket.emit('getAirportsFrom', answer);

                            });
                        });


                        // ОБРАБОТЧИК ЗАПРОСА КОНЕЧНЫХ АЭРОПОРТОВ
                        socket.on('getAirportsTo', function (message) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method getAirportsTo with param line: " + message.line);

                            functions_module.getAirportsByLine(sql_client, config_module.sql.database, message.line, function (airports) {

                                // формирование пакета для отправки
                                var answer = {
                                    'result': airports,
                                    'error': null
                                };

                                // отправка результата
                                log.trace("Send to " + socket.id + ":");
                                log.trace(answer);

                                socket.emit('getAirportsTo', answer);

                            });
                        });


                        // ОБРАБОТЧИК УСТАНОВКИ ИСХОДЯЩЕГО АЭРОПОРТА ПОЛЬЗОВАТЕЛЯ
                        socket.on('setAirportFrom', function (message) {

                            // запись сообщения клиента в отладку
                            log.trace("User " + socket.id + " get method setAirportFrom, message: ");
                            log.trace(message);

                            socket.session.userAirportFrom = message.params.airport;

                            log.info("User " + socket.id + " set Airport From: " + socket.session.userAirportFrom);
                        });


                        // ОБРАБОТЧИК УСТАНОВКИ КОНЕЧНОГО АЭРОПОРТА ПОЛЬЗОВАТЕЛЯ
                        socket.on('setAirportTo', function (message) {

                            // запись сообщения клиента в отладку
                            log.trace("User " + socket.id + " get method setAirportTo, message: ");
                            log.trace(message);

                            socket.session.userAirportTo = message.params.airport;

                            log.info("User " + socket.id + " set Airport To: " + socket.session.userAirportTo);
                        });


                        // ОБРАБОТЧИК ЗАПРОСА АВИАЛИНИЙ КОТОРЫЕ ЛЕТАЮТ ИЗ ПУНКТА "A" В ПУНКТ "B"
                        socket.on('getAirlines', function (message) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method getAirlines.");

                            functions_module.getAirlines(sql_client, config_module.sql.database, socket.session.userAirportFrom, socket.session.userAirportTo, function (airlines) {

                                // формирование пакета для отправки
                                var answer = {
                                    'result': airlines,
                                    'error': null
                                };

                                log.trace("Send to " + socket.id + ":");
                                log.trace(answer);

                                socket.emit('getAirlines', answer);

                            });
                        });


                        // ОБРАБОТЧИК ЗАПРОСА КРЕДИТНОГО РЕЙТИНГА
                        socket.on('getCreditScore', function (message) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method getCreditScore.");

                            functions_module.getCreditScore(sql_client, config_module.sql.database, function (credit_score) {

                                // формирование пакета для отправки
                                var answer = {
                                    'result': credit_score,
                                    'error': null
                                };

                                log.trace("Send to " + socket.id + ":");
                                log.trace(answer);

                                socket.emit('getCreditScore', answer);

                            });
                        });


                        // ОБРАБОТЧИК УСТАНОВКИ КРЕДИТНОГО РЕЙТИНГА ПОЛЬЗОВАТЕЛЯ
                        socket.on('setCreditScore', function (message) {

                            // запись сообщения клиента в отладку
                            log.trace("User " + socket.id + " get method setCreditScore, message: ");
                            log.trace(message);

                            functions_module.getCreditScoreById(sql_client, config_module.sql.database, message.params.creditScore, function (credit_score) {

                                socket.session.creditScoreMin = Number(credit_score.min);
                                socket.session.creditScoreMax = Number(credit_score.max);
                        
                                log.info("User " + socket.id + " set CreditScore: " + credit_score.min + "-" + credit_score.max);

                                // формирование пакета для отправки
                                var answer = {
                                    'result': true,
                                    'error': null
                                };

                                functions_module.getMinCreditScore(sql_client, config_module.sql.database, function (min_credit_score) {

                                    if (credit_score.max <= min_credit_score) {
                                        answer.result = false;
                                    }

                                    // отправка результата
                                    log.trace("Send to " + socket.id + ":");
                                    log.trace(answer);

                                    socket.emit('checkCreditScore', answer);
                                });

                            });

                        });


                        // ОБРАБОТЧИК ЗАПРОСА ДОХОДА
                        socket.on('getIncome', function (message) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method getIncome.");

                            functions_module.getIncome(sql_client, config_module.sql.database, function (income) {

                                // формирование пакета для отправки
                                var answer = {
                                    'result': income,
                                    'error': null
                                };

                                // отправка результата
                                log.trace("Send to " + socket.id + ":");
                                log.trace(answer);

                                socket.emit('getIncome', answer);

                            });
                        });


                        // ОБРАБОТЧИК УСТАНОВКИ ДОХОДА ПОЛЬЗОВАТЕЛЯ
                        socket.on('setIncome', function (message) {

                            // запись сообщения клиента в отладку
                            log.trace("User " + socket.id + " get method setIncome, message: ");
                            log.trace(message);

                            functions_module.getIncomeById(sql_client, config_module.sql.database, message.params.income, function (income) {

                                socket.session.incomeMin = Number(income.min);
                                socket.session.incomeMax = Number(income.max);
                                
                                log.info("User " + socket.id + " set Income: " + income.min + "-" + income.max);

                                // формирование пакета для отправки
                                var answer = {
                                    'result': true,
                                    'error': null
                                };

                                functions_module.getMinIncome(sql_client, config_module.sql.database, function (min_income) {

                                    if (income.max <= min_income || socket.session.creditScoreMin < income.min_credit_score) {
                                        answer.result = false;
                                    }

                                    // отправка результата
                                    log.trace("Send to " + socket.id + ":");
                                    log.trace(answer);

                                    socket.emit('checkIncome', answer);
                                });

                            });

                        });


                        // ОБРАБОТЧИК УСТАНОВКИ КОЛИЧЕСТВА КАРТ ПОЛЬЗОВАТЕЛЯ
                        socket.on('setCardCount', function (message) {

                            // запись сообщения клиента в отладку
                            log.trace("User " + socket.id + " get method setCardCount, message: ");
                            log.trace(message);

                            socket.session.cardCount = Number(message.params.cardCount);

                            log.info("User " + socket.id + " set cardCount: " + socket.session.cardCount);
                        });


                        // ОБРАБОТЧИК ЗАПРОСА ДОПУСТИМЫХ СТАТУСОВ ПОЛЬЗОВАТЕЛЯ
                        socket.on('getMaritalStatus', function (message) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method getMaritalStatus.");

                            functions_module.getMaritalStatus(sql_client, config_module.sql.database, function (marital_status) {

                                // формирование пакета для отправки
                                var answer = {
                                    'result': marital_status,
                                    'error': null
                                };

                                log.trace("Send to " + socket.id + ":");
                                log.trace(answer);

                                socket.emit('getMaritalStatus', answer);

                            });

                        });


                        // ОБРАБОТЧИК ЗАПРОСА ВСЕХ КАРТ
                        socket.on('getAllCards', function (message) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method getAllCards.");

                            functions_module.getAllCards(sql_client, config_module.sql.database, function (cards) {

                                // формирование пакета для отправки
                                var answer = {
                                    'result': {
                                        max: socket.session.cardCount,
                                        cards: cards
                                    },
                                    'error': null
                                };

                                log.trace("Send to " + socket.id + ":");
                                log.trace(answer);

                                socket.emit('getAllCards', answer);

                            });

                        });


                        // ОБРАБОТЧИК УСТАНОВКИ ВСЕХ КАРТ ПОЛЬЗОВАТЕЛЯ
                        socket.on('setAllCards', function (message) {

                            // запись сообщения клиента в отладку
                            log.trace("User " + socket.id + " get method setAllCards, message: ");
                            log.trace(message.params);

                            socket.session.allCards = message.params.data;

                            log.info("User " + socket.id + " set All Card To: ");
                            log.info(socket.session.allCards);

                        });


                        // ОБРАБОТЧИК ЗАПРОСА AMEX КАРТ
                        socket.on('getAmExCards', function (message) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method getAmExCards.");

                            functions_module.getAmExCards(sql_client, config_module.sql.database, function (cards) {

                                // формирование пакета для отправки
                                var answer = {
                                    'result': {
                                        max: socket.session.cardCount,
                                        cards: cards
                                    },
                                    'error': null
                                };

                                log.trace("Send to " + socket.id + ":");
                                log.trace(answer);

                                socket.emit('getAmExCards', answer);

                            });

                        });


                        // ОБРАБОТЧИК УСТАНОВКИ AMEX КАРТ ПОЛЬЗОВАТЕЛЯ
                        socket.on('setAmExCards', function (message) {

                            // запись сообщения клиента в отладку
                            log.trace("User " + socket.id + " get method setAmExCards, message: ");
                            log.trace(message.params);

                            socket.session.amExCards = message.params.data;

                            log.info("User " + socket.id + " set AmEx Card To: ");
                            log.info(socket.session.amExCards);

                        });


                        // ОБРАБОТЧИК УСТАНОВКИ ОСТАЛЬНЫХ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
                        socket.on('setOtherQuestions', function (message) {

                            // запись сообщения клиента в отладку
                            log.trace("User " + socket.id + " get method setOtherQuestions, message: ");
                            log.trace(message);

                            socket.session.statusValue = Number(message.params.data.statusValue);
                            socket.session.minPeople = Number(message.params.data.minPeople);
                            socket.session.maxPeople = Number(message.params.data.maxPeople);
                            socket.session.spendNextMonth = Number(message.params.data.spendNextMonth);
                            socket.session.spendNextYear = Number(message.params.data.spendNextYear);

                            log.info("User " + socket.id + " set Marital Status to value: " + socket.session.statusValue);
                            log.info("User " + socket.id + " set Min People To: " + socket.session.minPeople);
                            log.info("User " + socket.id + " set Max People To: " + socket.session.maxPeople);
                            log.info("User " + socket.id + " set Spend Next Month: " + socket.session.spendNextMonth);
                            log.info("User " + socket.id + " set Spend Next Year: " + socket.session.spendNextYear);

                        });

                        
                        // ОБРАБОТЧИК ЗАПРОСА РАССЧИТАНЫХ КОНЕЧНЫХ ДАННЫХ
                        socket.on('getCalculatedData', function (message) {

                            // запись сообщения клиента в отладку
                            log.info("User " + socket.id + " get method getCalculatedData.");

                            // запрос вычисления данных
                            functions_module.getCalculatedData(sql_client, config_module.sql.database, socket.session, function (data) {

                                // формирование пакета для отправки
                                var answer = {
                                    'result': data,
                                    'error': null
                                }, lenght_before = data.length;

                                // выбор N лучших вариантов
                                if (answer.result.length >= config_module.calculate.max_variants) {
                                    answer.result.length = config_module.calculate.max_variants;
                                }
                                
                                log.info("Calculated data to user " + socket.id + " completed, " + lenght_before + " variant(s) collected, " + answer.result.length + " has been sent.");

                                log.trace("Send to " + socket.id + ":");
                                log.trace(answer);

                                socket.emit('getCalculatedData', answer);
                                
                            });

                        });
                        //********************************************************//


                        // отключение клиента
                        socket.on('disconnect', function () {
                            log.info("User " + socket.id + " disconnected.");
                        });

                    });

                }

            });

        }

    });

};


/*-------------- ЭКСПОРТ ------------------*/
/*global module*/
module.exports.WS = WS;

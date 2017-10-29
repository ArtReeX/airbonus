/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
module.exports.get = function (config, params, database, log, async, callback) {
    
    'use strict';

    // данные для работы
    var data = {
        
            result: {
                
                //не отсортированый конечный результат
                unsorted: [],

                // отсортированый конечный результат
                sorted: []
                
            },
        
            routes: {
                
                // прямые рейсы
                direct: null,

                // обратные рейсы
                back: null
                
            },
        
            cards: {
                
                // имеющиеся карты
                available: [],

                // доступные карты
                free: []
                
            },

            // допустимые авиалинии к картам
            authorized_airlines: [],

            routes_cost: {
                
                available: {
                    
                    // стоимости прямых рейсов имеющихся карт
                    direct: [],
                    
                    // стоимости обратных рейсов имеющихся карт
                    back: []
                    
                },
                
                free: {
                    
                    // стоимости прямых рейсов свободных карт
                    direct: [],

                    // стоимости обратных рейсов свободных карт
                    back: []
                }
                
            }
        
        },

        // выбор прямых рейсов
        selectDirectRoutes = function (conn, done) {

            conn.query("SELECT airlines.name, routes.airline_id, routes.mile, routes.price, routes.source, routes.destination FROM routes, airlines WHERE airlines.iata = routes.airline_id AND routes.source='" + params.userAirportFrom + "' AND routes.destination='" + params.userAirportTo + "' ORDER BY routes.mile", function (error, routes) {

                if (error) {
                    log.debug("Error MySQL connection: " + error);
                    done();
                } else {
                    data.routes.direct = routes;
                    done();
                }

            });

        },
        
        // выбор обратных рейсов
        selectBackRoutes = function (conn, done) {

            conn.query("SELECT airlines.name, routes.airline_id, routes.mile, routes.price, routes.source, routes.destination FROM routes, airlines WHERE airlines.iata = routes.airline_id AND routes.source='" + params.userAirportTo + "' AND routes.destination='" + params.userAirportFrom + "' ORDER BY routes.mile", function (error, routes) {

                if (error) {
                    log.debug("Error MySQL connection: " + error);
                    done();
                } else {
                    data.routes.back = routes;
                    done();
                }

            });

        },
        
        // выбор имеющихся карт
        selectAvailableCards = function (conn, done) {
            
            // пользовательские карты
            var user_cards = [];

            async.series([

                // переписываем имеющиеся карты в массив
                function (done) {
                    var i;
                    for (i = 0; i < params.allCards.length; i += 1) {
                        user_cards.push(params.allCards[i].card);

                        if (i === params.allCards.length - 1) {
                            done();
                        }
                    }

                    if (params.allCards.length === 0) {
                        done();
                    }
                },

                // выбираем имеющиеся карты
                function (done) {

                    if (user_cards.length && data.authorized_airlines.length) {

                        // делаем запрос на выбор всех карт, которые есть у пользователя
                        conn.query("SELECT cards.id, cards.name, cards.bonus_cur, cards.bonus_max, cards.amount, cards.fee1, cards.link, cards.image, cards.airline_iata, cards.id FROM cards WHERE cards.id IN (" + user_cards + ") AND cards.airline_iata IN (" + data.authorized_airlines + ") ORDER BY cards.amount", function (error, available_cards) {

                            if (error) {
                                log.debug("Error MySQL connection: " + error);
                                done();
                            } else {

                                data.cards.available = available_cards;
                                
                                // счётчики
                                var card_count, card_mile, act_count;
                                
                                // определение установленного пользователем значения бонусов для каждой из карт
                                for (card_count = 0; card_count < data.cards.available.length; card_count += 1) {
                                    
                                    for (act_count = 0; act_count < params.allCards.length; act_count += 1) {
                                        
                                        if (Number(data.cards.available[card_count].id) === Number(params.allCards[act_count].card)) {
                                            data.cards.available[card_count].bonus_cur = params.allCards[act_count].bonus;
                                        }
                                        
                                    }
                                    
                                    if (card_count === data.cards.available.length - 1) {
                                        done();
                                    }
                                }
                                
                                if (data.cards.available.length === 0) {
                                    done();
                                }
                            }
                        });
                    } else {
                        done();
                    }
                }
            ],
                function () {
                    done();
                });

            
        },

        // расчёт стоимостей имеющихся карт
        calcCostAvailableCards = function (conn, done) {

            // счётчики
            var card_count, act_count, route_count, people_count;
            
            // поиск доступных карт, на которых есть достаточное количество бонусов
            for (card_count = 0; card_count < data.cards.available.length; card_count += 1) {

                //--------------------- прямой маршрут ---------------------//

                // проверка бонусов на карте с требованием поездки
                for (route_count = 0; route_count < data.routes.direct.length; route_count += 1) {

                    // проверка достаточности оплаты от мин. (1) к макс. количеству людей
                    for (people_count = 1; people_count <= params.maxPeople + params.statusValue; people_count += 1) {

                        // 
                        
                        // проверка на возможность покупки разного количества билетов за бонусы
                        if (data.cards.available[card_count].bonus_cur >= (data.routes.direct[route_count].mile * people_count) && data.cards.available[card_count].airline_iata === data.routes.direct[route_count].airline_id) {

                            // добавление записи
                            data.routes_cost.available.direct.push({
                                card: data.cards.available[card_count].name,
                                card_id: Number(data.cards.available[card_count].id),
                                airline: data.routes.direct[route_count].name,
                                from: data.routes.direct[route_count].source,
                                to: data.routes.direct[route_count].destination,
                                fee1: Number(data.cards.available[card_count].fee1),
                                amount: 0,
                                mile: Number(data.routes.direct[route_count].mile) * people_count,
                                tickets_direct: Number(people_count),
                                tickets_back: 0,
                                link: data.cards.available[card_count].link,
                                image: data.cards.available[card_count].image,
                                have: true
                            });
                        }
                    }
                }

                //--------------------- обратный маршрут ---------------------//

                // проверка бонусов на карте с требованием поездки
                for (route_count = 0; route_count < data.routes.back.length; route_count += 1) {

                    // проверка достаточности оплаты от мин. (1) к макс. количеству людей
                    for (people_count = 1; people_count <= params.maxPeople + params.statusValue; people_count += 1) {

                        // проверка на возможность покупки разного количества билетов за бонусы
                        if (data.cards.available[card_count].bonus_cur >= (data.routes.back[route_count].mile * people_count) && data.cards.available[card_count].airline_iata === data.routes.back[route_count].airline_id) {

                            // добавление записи
                            data.routes_cost.available.back.push({
                                card: data.cards.available[card_count].name,
                                card_id: Number(data.cards.available[card_count].id),
                                airline: data.routes.back[route_count].name,
                                from: data.routes.back[route_count].source,
                                to: data.routes.back[route_count].destination,
                                fee1: Number(data.cards.available[card_count].fee1),
                                amount: 0,
                                mile: Number(data.routes.back[route_count].mile) * people_count,
                                tickets_direct: 0,
                                tickets_back: Number(people_count),
                                link: data.cards.available[card_count].link,
                                image: data.cards.available[card_count].image,
                                have: true
                            });
                        }
                    }

                }

                if (card_count === data.cards.available.length - 1) {
                    done();
                }
            }

            if (data.cards.available.length === 0) {
                done();
            }

        },
        
        // выбор доступных карт
        selectFreeCards = function (conn, done) {
            
            // идентификаторы карт пользователя
            var user_cards = [];

            async.series([

                // переписываем имеющиеся карты в массив
                function (done) {
                    var i;
                    for (i = 0; i < params.allCards.length; i += 1) {
                        user_cards.push(params.allCards[i].card);

                        if (i === params.allCards.length - 1) {
                            done();
                        }
                    }

                    if (params.allCards.length === 0) {
                        done();
                    }
                },

                // расчёт свободных карт
                function (done) {

                    // делаем запрос на выбор всех карт, кроме тех, которые есть у пользователя
                    var query;
                    if (user_cards.length) {

                        if (data.authorized_airlines.length) {
                            query = "SELECT cards.id, cards.name, cards.bonus_cur, cards.bonus_max, cards.amount, cards.fee1, cards.link, cards.image, cards.airline_iata FROM cards WHERE cards.id NOT IN (" + user_cards + ") AND cards.airline_iata IN (" + data.authorized_airlines + ") ORDER BY cards.fee1";
                        } else {
                            done();
                            return;
                        }

                    } else {

                        if (data.authorized_airlines.length) {
                            query = "SELECT cards.id, cards.name, cards.bonus_cur, cards.bonus_max, cards.amount, cards.fee1, cards.link, cards.image, cards.airline_iata FROM cards WHERE cards.airline_iata IN (" + data.authorized_airlines + ") ORDER BY cards.fee1";
                        } else {
                            done();
                            return;
                        }

                    }

                    conn.query(query, function (error, free_cards) {

                        if (error) {
                            log.debug("Error MySQL connection: " + error);
                            done();
                        } else {
                            data.cards.free = free_cards;
                            done();
                        }

                    });

                }
            ],
                function () {
                    done();
                });

            
        },

        // расчёт стоимостей свободных карт
        calcCostFreeCards = function (conn, done) {

            // счётчики
            var card_count, route_count, people_count;

            // поиск доступных карт, на которых есть достаточное количество бонусов
            for (card_count = 0; card_count < data.cards.free.length; card_count += 1) {

                //--------------------- прямой маршрут ---------------------//

                // проверка бонусов на карте с требованием поездки
                for (route_count = 0; route_count < data.routes.direct.length; route_count += 1) {

                    // проверка достаточности оплаты от мин. (1) к макс. количеству людей
                    for (people_count = 1; people_count <= params.maxPeople + params.statusValue; people_count += 1) {

                        // проверка на возможность покупки разного количества билетов за бонусы
                        if (data.cards.free[card_count].bonus_cur >= (data.routes.direct[route_count].mile * people_count) && data.cards.free[card_count].airline_iata === data.routes.direct[route_count].airline_id) {

                            // добавление записи
                            data.routes_cost.free.direct.push({
                                card: data.cards.free[card_count].name,
                                card_id: Number(data.cards.free[card_count].id),
                                airline: data.routes.direct[route_count].name,
                                from: data.routes.direct[route_count].source,
                                to: data.routes.direct[route_count].destination,
                                fee1: Number(data.cards.free[card_count].fee1),
                                amount: Number(data.cards.free[card_count].amount),
                                mile: Number(data.routes.direct[route_count].mile) * people_count,
                                tickets_direct: Number(people_count),
                                tickets_back: 0,
                                link: data.cards.free[card_count].link,
                                image: data.cards.free[card_count].image,
                                have: false
                            });
                        }
                    }
                }

                //--------------------- обратный маршрут ---------------------//

                // проверка бонусов на карте с требованием поездки
                for (route_count = 0; route_count < data.routes.back.length; route_count += 1) {

                    // проверка достаточности оплаты от мин. (1) к макс. количеству людей
                    for (people_count = 1; people_count <= params.maxPeople + params.statusValue; people_count += 1) {

                        // проверка на возможность покупки разного количества билетов за бонусы
                        if (data.cards.free[card_count].bonus_cur >= (data.routes.back[route_count].mile * people_count) && data.cards.free[card_count].airline_iata === data.routes.back[route_count].airline_id) {

                            // добавление записи
                            data.routes_cost.free.back.push({
                                card: data.cards.free[card_count].name,
                                card_id: Number(data.cards.free[card_count].id),
                                airline: data.routes.back[route_count].name,
                                from: data.routes.back[route_count].source,
                                to: data.routes.back[route_count].destination,
                                fee1: Number(data.cards.free[card_count].fee1),
                                amount: Number(data.cards.free[card_count].amount),
                                mile: Number(data.routes.back[route_count].mile) * people_count,
                                tickets_direct: 0,
                                tickets_back: Number(people_count),
                                link: data.cards.free[card_count].link,
                                image: data.cards.free[card_count].image,
                                have: false
                            });
                        }
                    }

                }

                if (card_count === data.cards.free.length - 1) {
                    done();
                }
            }

            if (data.cards.free.length === 0) {
                done();
            }

        },

        // определение разрешённых авиалиний карт для прямых рейсов
        identifyAirlinesForDirect = function (done) {

            var i;
            for (i = 0; i < data.routes.direct.length; i += 1) {

                if (data.authorized_airlines.indexOf("'" + data.routes.direct[i].airline_id + "'") === -1) {
                    data.authorized_airlines.push("'" + data.routes.direct[i].airline_id + "'");
                }

                if (i === data.routes.direct.length - 1) {
                    done();
                }
            }

            if (data.routes.direct.length === 0) {
                done();
            }
        },

        // определение разрешённых авиалиний карт для обратных рейсов
        identifyAirlinesForBack = function (done) {

            var i;
            for (i = 0; i < data.routes.back.length; i += 1) {

                if (data.authorized_airlines.indexOf("'" + data.routes.back[i].airline_id + "'") === -1) {
                    data.authorized_airlines.push("'" + data.routes.back[i].airline_id + "'");
                }

                if (i === data.routes.back.length - 1) {
                    done();
                }
            }

            if (data.routes.back.length === 0) {
                done();
            }
        },
        
        checkBonusesInCards = function (table) {
            
            // счётчики
            var table_count, check_count, sum_card_count, all_card_count, all_cards = data.cards.available.concat(data.cards.free), total_cards = [];
            
            // перезапись данных стоимостей карт из таблицы
            for (table_count = 0; table_count < table.length; table_count += 1) {
                
                // проверка на наличие уже существующей информации о карте
                for (check_count = 0; check_count < total_cards.length; check_count += 1) {
                    
                    // если такой элемент найден
                    if (total_cards[check_count].id === table[table_count].card_id) {
                        break;
                    }
                
                }
                
                if (check_count < total_cards.length) {
                    
                    // если такой элемент найден
                    total_cards[check_count].sum_mile += table[table_count].mile;
                
                } else {
                    
                    // если такой элемент не найден
                    total_cards.push({
                        
                        // идентификатор
                        id: Number(table[table_count].card_id),
                        // количество миль
                        sum_mile: Number(table[table_count].mile)
                        
                    });
                }
                
            }
            
            // проверка на то, достаточно ли суммарной стоимости
            for (sum_card_count = 0; sum_card_count < total_cards.length; sum_card_count += 1) {
                
                // ищем из всех карт нашу по идентификатору
                for (all_card_count = 0; all_card_count < all_cards.length; all_card_count += 1) {
                    
                    // если такой элемент найден
                    if (total_cards[sum_card_count].id === all_cards[all_card_count].id) {
                        
                        // если бонусов на карте не достаточно, возращаем отрицательный результат
                        if (total_cards[sum_card_count].sum_mile > all_cards[all_card_count].bonus_cur) {
                            return false;
                        }
                        
                    }
                
                }
                
            }
            
            return true;
        },
        
        // проверка результатов на существование похожего варианта
        checkArrayToUnique = function (variant) {
            
            // счётчики
            var array_count, variant_count_one, variant_count_two, indication_unique, tickets_count, tickets_variant, tickets_table;
            
            tickets_variant = 0;
            
            // получение количества человек для узнаваемого варианта
            for (tickets_count = 0; tickets_count < variant.length; tickets_count += 1) {
                tickets_variant += variant[tickets_count].tickets;
            }
            
            for (array_count = 0; array_count < data.result.unsorted.length; array_count += 1) {
                    
                tickets_table = 0;
                    
                // получение количества человек для имеющегося варианта
                for (tickets_count = 0; tickets_count < data.result.unsorted[array_count].variant.length; tickets_count += 1) {
                    tickets_table += data.result.unsorted[array_count].variant[tickets_count].tickets;
                }

                if (tickets_variant <= tickets_table && variant.length > data.result.unsorted[array_count].variant.length) {
                    return false;
                }
                
                // если размер одинаковый, выполняем проверки на уникальность
                if (data.result.unsorted[array_count].variant.length === variant.length) {
                    
                    // индикатор уникальностей элемента
                    indication_unique = variant.length;

                    for (variant_count_one = 0; variant_count_one < data.result.unsorted[array_count].variant.length; variant_count_one += 1) {

                        for (variant_count_two = 0; variant_count_two < variant.length; variant_count_two += 1) {

                            // проверка на совпадение каждого варианта                       
                            if (data.result.unsorted[array_count].variant[variant_count_one].card === variant[variant_count_two].card
                                    && data.result.unsorted[array_count].variant[variant_count_one].card_id === variant[variant_count_two].card_id
                                    && data.result.unsorted[array_count].variant[variant_count_one].airline === variant[variant_count_two].airline
                                    && (data.result.unsorted[array_count].variant[variant_count_one].from === variant[variant_count_two].from
                                        || data.result.unsorted[array_count].variant[variant_count_one].from === variant[variant_count_two].to)
                                    && (data.result.unsorted[array_count].variant[variant_count_one].to === variant[variant_count_two].to
                                        || data.result.unsorted[array_count].variant[variant_count_one].to === variant[variant_count_two].from)
                                    && data.result.unsorted[array_count].variant[variant_count_one].have === variant[variant_count_two].have) {

                                // если элемент совпал, уменьшаем процент уникальности
                                indication_unique -= 1;
                                break;

                            }
                        }
                    }

                    // если объект не уникальный
                    if (!indication_unique) {
                        return false;
                    }

                }
            }
            
            return true;
        },

        // рекурсивный алгоритм обработки данных
        calcRecursive = function (combined_array, step, recursion_depth, temp_array, temp_array_params, criterion_calc, need_tickets, done) {
            
            // проверка на конец глубины рекурсии
            if (step === recursion_depth || data.result.unsorted.length >= 100) {
                return;
            }

            var sum_amount, sum_fee1, sum_tickets_direct, sum_tickets_back, array_count, table_count, table = [], tickets;
            
            for (array_count = 0; array_count < combined_array.length; array_count += 1) {

                //---------------- добавление элемента во временный массив -------------------//
                temp_array.push(combined_array[array_count]);
              
                //---------------- добавление параметров ------------------//
                temp_array_params.sum_amount += combined_array[array_count].amount;
                temp_array_params.sum_fee1 += combined_array[array_count].fee1;
                temp_array_params.sum_tickets_direct += combined_array[array_count].tickets_direct;
                temp_array_params.sum_tickets_back += combined_array[array_count].tickets_back;
 
                //---------------- проверка результата -------------------//
                
                // критерий карты для траты меньше 3-х месяцев
                if ((temp_array_params.sum_amount + temp_array_params.sum_fee1) <= criterion_calc.amount_min && temp_array_params.sum_tickets_direct >= criterion_calc.min_people && temp_array_params.sum_tickets_back >= criterion_calc.min_people && temp_array_params.sum_tickets_direct <= criterion_calc.max_people && temp_array_params.sum_tickets_back <= criterion_calc.max_people && temp_array_params.sum_tickets_direct === temp_array_params.sum_tickets_back && temp_array_params.sum_tickets_direct === need_tickets) {

                    // формирование объекта  
                    for (table_count = 0; table_count < temp_array.length; table_count += 1) {

                        if (temp_array[table_count].tickets_direct) {
                            tickets = temp_array[table_count].tickets_direct;
                        } else {
                            tickets = temp_array[table_count].tickets_back;
                        }
                        
                        table.push({
                            card: temp_array[table_count].card,
                            card_id: temp_array[table_count].card_id,
                            airline: temp_array[table_count].airline,
                            from: temp_array[table_count].from,
                            to: temp_array[table_count].to,
                            fee1: temp_array[table_count].fee1,
                            amount: temp_array[table_count].amount,
                            mile: temp_array[table_count].mile,
                            tickets: tickets,
                            link: temp_array[table_count].link,
                            image: temp_array[table_count].image,
                            have: temp_array[table_count].have
                        });
                    }
                    
                    // проверка на достаточное количество бонусов каждой карты и на уникальность варианта
                    if (checkBonusesInCards(table) && checkArrayToUnique(table)) {
                        
                        // добавление объекта
                        data.result.unsorted.push({
                            variant: table.slice(),
                            text: null
                        });
                        
                    }
                    
                    
                    // очистка массива
                    table.splice(0, table.length);


                } else {

                    // критерий карты для траты меньше 12-х месяцев
                    if ((temp_array_params.sum_amount + temp_array_params.sum_fee1) <= criterion_calc.amount_max && temp_array_params.sum_tickets_direct >= criterion_calc.min_people && temp_array_params.sum_tickets_back >= criterion_calc.min_people && temp_array_params.sum_tickets_direct <= criterion_calc.max_people && temp_array_params.sum_tickets_back <= criterion_calc.max_people && temp_array_params.sum_tickets_direct === temp_array_params.sum_tickets_back && temp_array_params.sum_tickets_direct === need_tickets) {

                        // формирование объекта  
                        for (table_count = 0; table_count < temp_array.length; table_count += 1) {

                            if (temp_array[table_count].tickets_direct) {
                                tickets = temp_array[table_count].tickets_direct;
                            } else {
                                tickets = temp_array[table_count].tickets_back;
                            }

                            table.push({
                                card: temp_array[table_count].card,
                                card_id: temp_array[table_count].card_id,
                                airline: temp_array[table_count].airline,
                                from: temp_array[table_count].from,
                                to: temp_array[table_count].to,
                                fee1: temp_array[table_count].fee1,
                                amount: temp_array[table_count].amount,
                                mile: temp_array[table_count].mile,
                                tickets: tickets,
                                link: temp_array[table_count].link,
                                image: temp_array[table_count].image,
                                have: temp_array[table_count].have
                            });
                        }

                        // проверка на достаточное количество бонусов каждой карты и на уникальность варианта
                        if (checkBonusesInCards(table) && checkArrayToUnique(table)) {

                            // добавление объекта
                            data.result.unsorted.push({
                                variant: table.slice(),
                                text: 'Unfortunately, you regular monthly spending is lower than required to receive a bonus. Assuming you can make some large purchases sooner, we have calculated for you the following card combination to ensure free travel.'
                            });

                        }
                        
                        // очистка массива
                        table.splice(0, table.length);
                    }

                }

                
                //---------------- вызов рекурсии -----------------------//
                calcRecursive(combined_array, step + 1, recursion_depth, temp_array, temp_array_params, criterion_calc, need_tickets, done);
                
                //---------------- удаление параметров ------------------//
                temp_array_params.sum_amount -= combined_array[array_count].amount;
                temp_array_params.sum_fee1 -= combined_array[array_count].fee1;
                temp_array_params.sum_tickets_direct -= combined_array[array_count].tickets_direct;
                temp_array_params.sum_tickets_back -= combined_array[array_count].tickets_back;

                //---------------- удаление элемента с временного массива -------------------//
                temp_array.pop();
            }
        },

        // конечное вычисление данных
        calcResultData = function (done) {

            // слияние массивов с ценами по отсортированому порядку
            var combined_array = data.routes_cost.available.direct.concat(data.routes_cost.available.back, data.routes_cost.free.direct, data.routes_cost.free.back),

                // временный массив для расчётов
                temp_array = [],
            
                // параметры для временного массива
                temp_array_params = {
                    sum_amount: 0,
                    sum_fee1: 0,
                    sum_tickets_direct: 0,
                    sum_tickets_back: 0
                },
                
                // критерии расчёта
                criterion_calc = {
                    amount_min: params.spendNextMonth * 3,
                    amount_max: (params.spendNextMonth * 3) + ((params.spendNextYear - (params.spendNextMonth * 12)) * 0.5),
                    min_people: params.minPeople + params.statusValue,
                    max_people: params.maxPeople + params.statusValue
                },
                
                // слияние всех карт
                all_cards = data.cards.available.concat(data.cards.free),
                
                // счётчик глубины рекурсии
                depth_count,
                
                // счётчик билетов
                tickets_count;

            // определение разного числа людей, от большего к меньшему
            for (tickets_count = criterion_calc.max_people; tickets_count >= criterion_calc.min_people; tickets_count -= 1) {
            
                // определение комбинаций карт для разного числа людей, от меньшего к большему
                for (depth_count = 1; depth_count <= config.recursion_depth; depth_count += 1) {

                    // проверка наличия данных в результате, если данных нету, ищем большую комбинацию
                    if (!data.result.unsorted.length) {

                        // вызов рекурсии для поиска n-ной комбинации карт
                        calcRecursive(combined_array, 0, depth_count, temp_array, temp_array_params, criterion_calc, tickets_count, done);

                    } else {
                        break;
                    }

                }
                
                if (depth_count !== config.recursion_depth + 1 || tickets_count === criterion_calc.min_people) {
                    done();
                    break;
                }
            }

        },
        
        // алгоритм сортировки результата
        sortResultAlgoritm = function (table_one, table_two) {
            
            var variant_count, variant_one_tickets = 0, variant_two_tickets = 0, variant_one_have = 0, variant_two_have = 0, variant_one_fee1 = 0, variant_two_fee1 = 0, variant_one_cards = [], variant_two_cards = [];
                
            // подсчёт количества билетов, комиссии и карт, которых есть
            for (variant_count = 0; variant_count < table_one.variant.length; variant_count += 1) {
                variant_one_tickets += table_one.variant[variant_count].tickets;
                variant_one_have += Number(table_one.variant[variant_count].have);
                variant_one_fee1 += table_one.variant[variant_count].fee1;
            }

            for (variant_count = 0; variant_count < table_two.variant.length; variant_count += 1) {
                variant_two_tickets += table_two.variant[variant_count].tickets;
                variant_two_have += Number(table_two.variant[variant_count].have);
                variant_two_fee1 += table_two.variant[variant_count].fee1;
            }
            
            // подсчёт количества карт
            for (variant_count = 0; variant_count < table_one.variant.length; variant_count += 1) {
                
                // если такая карта ещё не учтена, запоминаем её
                if (variant_one_cards.indexOf(table_one.variant[variant_count].card_id) === -1) {
                    variant_one_cards.push(table_one.variant[variant_count].card_id);
                }
                
            }
            
            for (variant_count = 0; variant_count < table_one.variant.length; variant_count += 1) {
                
                // если такая карта ещё не учтена, запоминаем её
                if (variant_two_cards.indexOf(table_two.variant[variant_count].card_id) === -1) {
                    variant_two_cards.push(table_two.variant[variant_count].card_id);
                }
                
            }

            return ((variant_two_tickets / variant_two_cards.length - (variant_two_fee1 / 100)) + (variant_two_have * 10)) - ((variant_one_tickets / variant_one_cards.length - (variant_one_fee1 / 100)) + (variant_one_have * 10));
        },
        
        // выбор лучших вариантов
        sortResultData = function (done) {
                   
            // перезапись
            data.result.sorted = data.result.unsorted;
            
            // сортировка 
            data.result.sorted.sort(sortResultAlgoritm);
            
            done();
        
        };


    // обращение к БД
    database.getConnection(function (error, conn) {

        if (error) {
            log.fatal("Error MySQL connection: " + error);
        } else {


            async.parallel([

                // получение прямых рейсов
                function (done) {
                    selectDirectRoutes(conn, done);
                },

                // получение обратных рейсов
                function (done) {
                    selectBackRoutes(conn, done);
                }

            ], function () {

                async.series([

                    // определение разрешённых авиалиний карт для прямых рейсов
                    function (done) {
                        identifyAirlinesForDirect(done);
                    },

                    // определение разрешённых авиалиний карт для обратных рейсов
                    function (done) {
                        identifyAirlinesForBack(done);
                    }

                ], function () {

                    async.parallel([

                        // расчёт стоимостей имеющихся карт
                        function (done) {
                            
                            async.series([
                                
                                function (done) {
                                    selectAvailableCards(conn, done);
                                },
                                
                                function (done) {
                                    calcCostAvailableCards(conn, done);
                                }
                                
                            ], function () {
                                done();
                            });
                            
                            
                        },

                        // расчёт стоимостей свободных карт
                        function (done) {
                            
                            async.series([
                                
                                function (done) {
                                    selectFreeCards(conn, done);
                                },
                                
                                function (done) {
                                    calcCostFreeCards(conn, done);
                                }
                                
                            ], function () {
                                done();
                            });
                            
                        }

                    ], function () {

                        async.series([

                            // высчитывание окончательных данных
                            function (done) {
                                calcResultData(done);
                            },
                            
                            // сортировка окончательных данных
                            function (done) {
                                sortResultData(done);
                            }

                        ], function () {

                            // возврат результата
                            callback(null, data.result.sorted);

                            // закрытие запроса
                            conn.release();

                        });
                    });

                });

            });

        }

    });

};

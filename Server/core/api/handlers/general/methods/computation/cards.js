/*globals module*/

/*---------------------------- МЕТОД ДЛЯ ОБРАБОТЧИКОВ API -------------------------------*/
module.exports.selectConversion = function (config, conn, cards_use_in_computation, user_cards, authorized_airlines, log, async, callback) {
    
    'use strict';
    
    // счётчики
    var cards_use_count,
        cards_all_count,
        programs_count,
        conversion_count,
        start_conversion_cards_count,
        start_conversion_id_count,
        start_conversion_id_one_card_count,
        cards_db_count,
        
        // идентификаторы после преобразования
        end_conversion_id = [],
        // идентификаторы карт до преобразования
        start_conversion_id = [],
        // идентификаторы одной карты до преобразования
        start_conversion_id_one_card = [],
        
        // все карты из БД
        cards_all = [],
        // карты используемые до рассчёта
        start_conversion_cards = [],
        
        // все направления преобразований из БД
        conversion_factors = [],
        
        // рассчитанные преобразованые карты
        cards_conversion = [],
        
        // проверка результатов на существование похожего варианта
        checkArrayToUnique = function (array_cards) {
            
            // счётчики
            var array_count_one, array_count_two;
            
            for (array_count_one = 0; array_count_one < array_cards.length; array_count_one += 1) {
                
                for (array_count_two = array_count_one + 1; array_count_two < array_cards.length; array_count_two += 1) {

                    if (Number(array_cards[array_count_one].params.card_id) === Number(array_cards[array_count_two].params.card_id)) { return false; }
                
                }
                
            }
            
            return true;
        },
        
        // алгоритм сортировки карт
        sortAlhoritmCards = function (card_one, card_two) {
            
            // сравнение двух карт по параметрам
            if (Boolean(card_one.card.have) !== Boolean(card_two.card.have)) {
                
                if (Boolean(card_one.card.have)) { return -1; }
                if (Boolean(card_two.card.have)) { return 1; }
                
            }
            
            if (Number(card_one.params.bonus_cur) !== Number(card_two.bonus_cur)) {
                
                if (Number(card_one.params.bonus_cur) > Number(card_two.params.bonus_cur)) { return -1; }
                if (Number(card_one.params.bonus_cur) < Number(card_two.params.bonus_cur)) { return 1; }
            
            }
            
            return 0;
                    
        },
        
        // генерация уникального идентификатора карты
        generateUniqueId = function (current_card, array_with_card) {

            var current_card_count,
                array_with_card_count,
                converted_card_count,
                array_with_card_id = [],
                common_identifier = "";
            
            // добавление всех идентификторов для текущей карты
            for (current_card_count = 0; current_card_count < array_with_card.length; current_card_count += 1) {
                
                array_with_card_id.push(Number(array_with_card[current_card_count].params.card_id));
                
            }
            
            // добавление всех идентификторов для текущей карты
            for (current_card_count = 0; current_card_count < array_with_card_id.length; current_card_count += 1) {
                
                common_identifier += String(array_with_card_id[current_card_count]);
                
            }
            
            
            // возврат уникального идентификатора
            return Number(String(current_card.params.card_id) + String(common_identifier));
            
        },
        
        // проверка массива карт на уникальность
        checkCardsToUnique = function (identificator, array_with_card) {
            
            var current_card_count,
                array_with_card_count,
                converted_card_count,
                array_all_card_id = [];
            
            // перебор уже добавленых карт на поиск похожей
            for (array_with_card_count = 0; array_with_card_count < cards_conversion.length; array_with_card_count += 1) {

                // проверка на наличие такой же комбинации
                if (Number(identificator) === Number(cards_conversion[array_with_card_count].params.card_id)) { return false; }
                
            }
            
            return true;
            
        },
        
        // рекурсивный алгоритм обработки данных
        calcRecursive = function (step, bounding_count, temp_array, temp_array_params, converion_factors, current_card, start_conversion_cards) {
            
            // проверка на конец глубины рекурсии
            if (step === config.recursion_depth_conversion) { return; }
            
            var array_count, table_count, table = [], conversion_program_current_count, array_program_current_count, conversion_factors_count, current_card_program_id, array_card_program_id, factor = 1;
                 
            for (array_count = 0; array_count < start_conversion_cards.length; array_count += 1) {

                // определение идентификатора программы для текущей карты
                current_card_program_id = current_card.card.program_id.split(",");
                
                // определение идентификатора программы для рекурсивной карты
                array_card_program_id = start_conversion_cards[array_count].card.program_id.split(",");
                
                // поиск курса обмена
                for (conversion_program_current_count = 0; conversion_program_current_count < current_card_program_id.length; conversion_program_current_count += 1) {
                    
                    for (array_program_current_count = 0; array_program_current_count < array_card_program_id.length; array_program_current_count += 1) {
                    
                        for (conversion_factors_count = 0; conversion_factors_count < conversion_factors.length; conversion_factors_count += 1) {
                            
                            if (Number(current_card_program_id[conversion_program_current_count]) === conversion_factors[conversion_factors_count].to_program_id
                                    && Number(array_card_program_id[array_program_current_count]) === conversion_factors[conversion_factors_count].from_program_id) {
                                
                                factor = Number(conversion_factors[conversion_factors_count].factor);
                                
                            }
                            
                        }
                    
                    }
                    
                }
                
                //---------------- добавление элемента во временный массив -------------------//
                temp_array.push(start_conversion_cards[array_count]);
                
                //---------------- добавление параметров ------------------//
                temp_array_params.sum_amount += Number(start_conversion_cards[array_count].params.amount);
                temp_array_params.sum_fee1 += Number(start_conversion_cards[array_count].params.fee1);
                temp_array_params.sum_bonus_cur += Number(start_conversion_cards[array_count].params.bonus_cur * factor);
 
                //---------------- проверка результата -------------------//
                
                // проверка комбинации на уникальность
                if (checkArrayToUnique(temp_array) && start_conversion_cards[array_count].params.card_id !== current_card.params.card_id && checkCardsToUnique(Number(generateUniqueId(cards_use_in_computation[cards_use_count], temp_array)), temp_array)) {
                    
                    // добавление карты
                    cards_conversion.push({

                        // текущая карта
                        card: cards_use_in_computation[cards_use_count].card,

                        // параметры
                        params: {
                            
                            card_id: Number(generateUniqueId(cards_use_in_computation[cards_use_count], temp_array)),
                            converted_from_card: Number(cards_use_in_computation[cards_use_count].params.converted_from_card),
                            
                            amount: Number(temp_array_params.sum_amount),
                            fee1: Number(temp_array_params.sum_fee1),
                            bonus_cur: Number(temp_array_params.sum_bonus_cur)
                            
                        },

                        // преобразованные карты
                        converted_cards: temp_array.slice()

                    });
                    
                }
                
                
                //---------------- вызов рекурсии -----------------------//
                calcRecursive(step + 1, bounding_count += 1, temp_array, temp_array_params, converion_factors, current_card, start_conversion_cards);
                
                //---------------- удаление параметров ------------------//
                temp_array_params.sum_amount -= Number(start_conversion_cards[array_count].params.amount);
                temp_array_params.sum_fee1 -= Number(start_conversion_cards[array_count].params.fee1);
                temp_array_params.sum_bonus_cur -= Number(start_conversion_cards[array_count].params.bonus_cur * factor);

                //---------------- удаление элемента с временного массива -------------------//
                temp_array.pop();
            }
            
        };
    
    async.series([
        
        function (callback) {
        
            async.parallel([
                
                // выбор всех карт из БД
                function (callback) {

                    conn.query("SELECT cards.id, cards.program_id, cards.bonus_cur, cards.amount, cards.fee1, cards.link, cards.image, cards.airline_iata, cards.name FROM cards ORDER BY cards.bonus_cur DESC", function (error, cards) {

                        if (error) { log.debug("Error MySQL connection: " + error); callback(); } else {
                            
                            // счётчики
                            var cards_db_count;
                            
                            for (cards_db_count = 0; cards_db_count < cards.length; cards_db_count += 1) {
                                
                                cards_all.push({

                                    // текущая карта
                                    card: cards[cards_db_count],

                                    // параметры
                                    params: {

                                        card_id: Number(cards[cards_db_count].id),
                                        converted_from_card: Number(cards[cards_db_count].id),

                                        amount: Number(cards[cards_db_count].amount),
                                        fee1: Number(cards[cards_db_count].fee1),
                                        bonus_cur: Number(cards[cards_db_count].bonus_cur)
                                    },

                                    // преобразованные карты
                                    converted_cards: []

                                });
                                
                            }
                            
                            // обозначение карт как не имеющиеся
                            for (cards_db_count = 0; cards_db_count < cards_all.length; cards_db_count += 1) {
                                cards_all[cards_db_count].card.have = false;
                            }
                            
                            // сортировка
                            cards_all.sort(sortAlhoritmCards);
                            
                            callback();
                            
                        }

                    });

                },
                
                // выбор всех направлений преобразований из БД
                function (callback) {
            
                    conn.query("SELECT conversion_factors.from_program_id, conversion_factors.to_program_id, conversion_factors.factor FROM conversion_factors ORDER BY conversion_factors.factor DESC", function (error, factors) {

                        if (error) { log.debug("Error MySQL connection: " + error); callback(); } else { conversion_factors = factors; callback(); }

                    });

                }
                
            ], function () { callback(); });
        
        },
        
        function (callback) {
          
            // замена из списка всех карт, имеющимися картами
            for (cards_use_count = 0; cards_use_count < user_cards.length; cards_use_count += 1) {
                
                for (cards_all_count = 0; cards_all_count < cards_all.length; cards_all_count += 1) {
                    
                    // проверка на совпадение идентификатора
                    if (Number(user_cards[cards_use_count].card) === Number(cards_all[cards_all_count].card.id)) {
                        
                        // замена данных карты
                        cards_all[cards_all_count].card.bonus_cur = cards_all[cards_all_count].params.bonus_cur = Number(user_cards[cards_use_count].bonus);
                        cards_all[cards_all_count].card.amount = cards_all[cards_all_count].params.amount = 0;
                        cards_all[cards_all_count].card.have = true;

                    }
                    
                }
                
            }
            
            callback();
            
        },
        
        function (callback) {
            
            for (cards_use_count = 0; cards_use_count < cards_use_in_computation.length; cards_use_count += 1) {
        
                // выбор всех идентификаторов карт, которые должны быть после преобразования
                end_conversion_id = cards_use_in_computation[cards_use_count].card.program_id.split(",");
                
                for (programs_count = 0; programs_count < end_conversion_id.length; programs_count += 1) {
                    
                    // выбор всех идентификаторов карт, которые могут преобразовываться в нашу карту
                    for (conversion_count = 0; conversion_count < conversion_factors.length; conversion_count += 1) {
                        
                        // добавление записи о возможности использования карты для преобразования
                        if (Number(conversion_factors[conversion_count].to_program_id) === Number(end_conversion_id[programs_count])) {
                            start_conversion_id.push(Number(conversion_factors[conversion_count].from_program_id));
                        }
                        
                    }
                    
                }
                
                // поиск всех карт, которые находяться до преобразования
                for (start_conversion_id_count = 0; start_conversion_id_count < start_conversion_id.length; start_conversion_id_count += 1) {
                    
                    for (start_conversion_cards_count = 0; start_conversion_cards_count < cards_all.length; start_conversion_cards_count += 1) {
                        
                        // выбор всех идентификаторов карты, которые она содержит
                        start_conversion_id_one_card = cards_all[start_conversion_cards_count].card.program_id.split(",");
                        
                        for (start_conversion_id_one_card_count = 0; start_conversion_id_one_card_count < start_conversion_id_one_card.length; start_conversion_id_one_card_count += 1) {
                            
                            // проверка карты на возможноть преобразования в конечную
                            if (Number(start_conversion_id_one_card[start_conversion_id_one_card_count]) === Number(start_conversion_id[start_conversion_id_count])
                                    && cards_use_in_computation[cards_use_count].params.card_id !== cards_all[start_conversion_cards_count].params.card_id) {
                                
                                // добавление карты
                                start_conversion_cards.push(cards_all[start_conversion_cards_count]);
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
                // запуск рекурсивного алгоритма вычисления
                calcRecursive(0, 0, [], {
                    sum_bonus_cur: cards_use_in_computation[cards_use_count].params.bonus_cur,
                    sum_amount: cards_use_in_computation[cards_use_count].params.amount,
                    sum_fee1: cards_use_in_computation[cards_use_count].params.fee1
                }, conversion_factors, cards_use_in_computation[cards_use_count], start_conversion_cards.sort(sortAlhoritmCards));
                
                // очистка идентификаторов карт, которые могут быть до преобразования
                start_conversion_id.splice(0, start_conversion_id.length);
                
                // очистка карт используемых до преобразования
                start_conversion_cards.splice(0, start_conversion_cards.length);

            }
            
            callback();
            
        }
        
    ], function () { callback(cards_conversion); });

};


module.exports.calcCostConversionCards = function (data, params, callback) {
    
    'use strict';
    
    // счётчики
    var card_count, act_count, route_count, people_count;

    // поиск доступных карт, на которых есть достаточное количество бонусов
    for (card_count = 0; card_count < data.cards.conversion.length; card_count += 1) {

        //--------------------- прямой маршрут ---------------------//

        // проверка бонусов на карте с требованием поездки
        for (route_count = 0; route_count < data.routes.direct.length; route_count += 1) {

            // проверка достаточности оплаты от мин. (1) к макс. количеству людей
            for (people_count = 1; people_count <= params.maxPeople + params.statusValue; people_count += 1) {

                // проверка на возможность покупки разного количества билетов за бонусы
                if (data.cards.conversion[card_count].params.bonus_cur >= (Number(data.routes.direct[route_count].price_miles ? Number(data.routes.direct[route_count].price_miles) : Number(data.routes.direct[route_count].miles)) * Number(people_count)) && data.cards.conversion[card_count].card.airline_iata === data.routes.direct[route_count].airline_iata &&
                        data.cards.conversion[card_count].params.amount + data.cards.conversion[card_count].params.fee1 <= Number((params.spendNextMonth * 3) + ((params.spendNextYear - (params.spendNextMonth * 12)) * 0.5))) {

                    // добавление записи
                    data.routes_cost.conversion.direct.push({
                        
                        card: String(data.cards.conversion[card_count].card.name),
                        
                        card_id: Number(data.cards.conversion[card_count].params.card_id),
                        
                        airline: String(data.routes.direct[route_count].name),
                        
                        from: String(data.routes.direct[route_count].destination),
                        
                        to: String(data.routes.direct[route_count].source),
                        
                        fee1: Number(data.cards.conversion[card_count].card.fee1),
                        
                        amount: Number(data.cards.conversion[card_count].card.amount),
                        
                        price_of_one_ticket: Number(data.routes.direct[route_count].price_miles ? Number(data.routes.direct[route_count].price_miles) : Number(data.routes.direct[route_count].miles)),
                        
                        mile: Number(data.routes.direct[route_count].price_miles ? Number(data.routes.direct[route_count].price_miles) : Number(data.routes.direct[route_count].miles)) * people_count,
                        
                        available_amount_of_bonuses: Number(data.cards.conversion[card_count].card.bonus_cur),
                        
                        tickets_direct: Number(people_count),
                        
                        tickets_back: 0,
                        
                        link: String(data.cards.conversion[card_count].card.link),
                        
                        image: String(data.cards.conversion[card_count].card.image),
                        
                        have: Boolean(data.cards.conversion[card_count].card.have),
                        
                        conversion: true,
                                
                        direct: true,
                        
                        params: data.cards.conversion[card_count].params,
                        
                        converted_cards: data.cards.conversion[card_count].converted_cards
                        
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
                if (data.cards.conversion[card_count].params.bonus_cur >= (Number(data.routes.back[route_count].price_miles ? Number(data.routes.back[route_count].price_miles) : Number(data.routes.back[route_count].miles)) * Number(people_count)) && data.cards.conversion[card_count].card.airline_iata === data.routes.back[route_count].airline_iata &&
                        data.cards.conversion[card_count].params.amount + data.cards.conversion[card_count].params.fee1 <= Number((params.spendNextMonth * 3) + ((params.spendNextYear - (params.spendNextMonth * 12)) * 0.5))) {

                    // добавление записи
                    data.routes_cost.conversion.back.push({
                        
                        card: String(data.cards.conversion[card_count].card.name),
                        
                        card_id: Number(data.cards.conversion[card_count].params.card_id),
                        
                        airline: String(data.routes.back[route_count].name),
                        
                        from: String(data.routes.back[route_count].destination),
                        
                        to: String(data.routes.back[route_count].source),
                        
                        fee1: Number(data.cards.conversion[card_count].card.fee1),
                        
                        amount: Number(data.cards.conversion[card_count].card.amount),
                        
                        price_of_one_ticket: Number(data.routes.back[route_count].price_miles ? Number(data.routes.back[route_count].price_miles) : Number(data.routes.back[route_count].miles)),
                        
                        mile: Number(data.routes.back[route_count].price_miles ? Number(data.routes.back[route_count].price_miles) : Number(data.routes.back[route_count].miles)) * people_count,
                        
                        available_amount_of_bonuses: Number(data.cards.conversion[card_count].card.bonus_cur),
                        
                        tickets_direct: 0,
                        
                        tickets_back: Number(people_count),
                        
                        link: String(data.cards.conversion[card_count].card.link),
                        
                        image: String(data.cards.conversion[card_count].card.image),
                        
                        have: Boolean(data.cards.conversion[card_count].card.have),
                        
                        conversion: true,
                                
                        direct: false,
                        
                        params: data.cards.conversion[card_count].params,
                        
                        converted_cards: data.cards.conversion[card_count].converted_cards
                        
                    });
                }
            }

        }

        if (card_count === data.cards.conversion.length - 1) { callback(); }
    }

    if (data.cards.conversion.length === 0) { callback(); }
};

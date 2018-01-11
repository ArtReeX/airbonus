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

                    if (Number(array_cards[array_count_one].id) === Number(array_cards[array_count_two].id)) { return false; }
                
                }
                
            }
            
            return true;
        },
        
        cardSortAlhoritm = function (card_one, card_two) {
                    
            return card_one.bonus_cur - card_two.bonus_cur;
                    
        },
        
        // рекурсивный алгоритм обработки данных
        calcRecursive = function (step, bounding_count, temp_array, temp_array_params, converion_factors, current_card, start_conversion_cards) {
            
            // проверка на конец глубины рекурсии и достаточное количество найденых вариантов
            if (step === config.recursion_depth_conversion || cards_conversion.length >= config.max_variants_recursion_conversion) { return; }
            
            var array_count, table_count, table = [], conversion_program_current_count, array_program_current_count, conversion_factors_count, current_card_program_id, array_card_program_id, factor = 1;
                 
            for (array_count = 0; array_count < start_conversion_cards.length; array_count += 1) {

                // определение идентификатора программы для текущей карты
                current_card_program_id = current_card.card.program_id.split(",");
                
                // определение идентификатора программы для рекурсивной карты
                array_card_program_id = start_conversion_cards[array_count].program_id.split(",");
                
                // поиск курса обмена
                for (conversion_program_current_count = 0; conversion_program_current_count < current_card_program_id.length; conversion_program_current_count += 1) {
                    
                    for (array_program_current_count = 0; array_program_current_count < array_card_program_id.length; array_program_current_count += 1) {
                    
                        for (conversion_factors_count = 0; conversion_factors_count < conversion_factors.length; conversion_factors_count += 1) {
                            
                            if (Number(current_card_program_id[conversion_program_current_count]) === conversion_factors[conversion_factors_count].to_program_id
                                    && Number(array_card_program_id[array_program_current_count]) === conversion_factors[conversion_factors_count].from_program_id) {
                                
                                factor = conversion_factors[conversion_factors_count].factor;
                                
                            }
                            
                        }
                    
                    }
                    
                }
                
                //---------------- добавление элемента во временный массив -------------------//
                temp_array.push(start_conversion_cards[array_count]);
                
                //---------------- добавление параметров ------------------//
                temp_array_params.sum_amount += start_conversion_cards[array_count].amount;
                temp_array_params.sum_fee1 += start_conversion_cards[array_count].fee1;
                temp_array_params.sum_bonus_cur += start_conversion_cards[array_count].bonus_cur * factor;
 
                //---------------- проверка результата -------------------//
                
                // проверка комбинации на уникальность
                if (checkArrayToUnique(temp_array)) {
                
                    // добавление карты
                    cards_conversion.push({

                        // текущая карта
                        card: cards_use_in_computation[cards_use_count].card,

                        // параметры
                        params: {
                            amount : temp_array_params.sum_amount,
                            fee1 : temp_array_params.sum_fee1,
                            bonus_cur : temp_array_params.sum_bonus_cur
                        },

                        // преобразованные карты
                        converted_cards : temp_array.slice()

                    });
                    
                }
                
                
                //---------------- вызов рекурсии -----------------------//
                calcRecursive(step + 1, bounding_count += 1, temp_array, temp_array_params, converion_factors, current_card, start_conversion_cards);
                
                //---------------- удаление параметров ------------------//
                temp_array_params.sum_amount -= start_conversion_cards[array_count].amount;
                temp_array_params.sum_fee1 -= start_conversion_cards[array_count].fee1;
                temp_array_params.sum_bonus_cur -= start_conversion_cards[array_count].bonus_cur * factor;

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
                            
                            // обозначение карт как не имеющиеся
                            var cards_db_count;
                            for (cards_db_count = 0; cards_db_count < cards.length; cards_db_count += 1) {
                                cards[cards_db_count].have = false;
                            }
                            
                            cards_all = cards.sort(cardSortAlhoritm);
                            
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
                    if (Number(user_cards[cards_use_count].card) === Number(cards_all[cards_all_count].id)) {
                        
                        // замена данных карты
                        cards_all[cards_all_count].bonus_cur = user_cards[cards_use_count].bonus;
                        cards_all[cards_all_count].have = true;

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
                        start_conversion_id_one_card = cards_all[start_conversion_cards_count].program_id.split(",");
                        
                        for (start_conversion_id_one_card_count = 0; start_conversion_id_one_card_count < start_conversion_id_one_card.length; start_conversion_id_one_card_count += 1) {
                            
                            // проверка карты на возможноть преобразования в конечную
                            if (Number(start_conversion_id_one_card[start_conversion_id_one_card_count]) === Number(start_conversion_id[start_conversion_id_count])
                                    && cards_use_in_computation[cards_use_count].card.id !== cards_all[start_conversion_cards_count].id) {
                                
                                // добавление карты
                                start_conversion_cards.push(cards_all[start_conversion_cards_count]);
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
                // запуск рекурсивного алгоритма вычисления
                calcRecursive(0, 0, [], {sum_bonus_cur : 0, sum_amount : 0, sum_fee1 : 0}, conversion_factors, cards_use_in_computation[cards_use_count], start_conversion_cards.sort(cardSortAlhoritm));
                
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
                if (data.cards.conversion[card_count].params.bonus_cur >= (data.routes.direct[route_count].price_miles * people_count) && data.cards.conversion[card_count].card.airline_iata === data.routes.direct[route_count].airline_iata) {

                    // добавление записи
                    data.routes_cost.conversion.direct.push({
                        card: data.cards.conversion[card_count].card.name,
                        card_id: Number(data.cards.conversion[card_count].card.id),
                        airline: data.routes.direct[route_count].name,
                        from: data.routes.direct[route_count].source,
                        to: data.routes.direct[route_count].destination,
                        fee1: Number(data.cards.conversion[card_count].card.fee1),
                        amount: Number(data.cards.conversion[card_count].card.amount),
                        mile: Number(data.routes.direct[route_count].price_miles ? Number(data.routes.direct[route_count].price_miles) : Number(data.routes.direct[route_count].miles)) * people_count,
                        tickets_direct: Number(people_count),
                        tickets_back: 0,
                        link: data.cards.conversion[card_count].card.link,
                        image: data.cards.conversion[card_count].card.image,
                        have: data.cards.conversion[card_count].card.have,
                        conversion: true,
                        
                        params: data.cards.conversion[card_count].params,
                        
                        converted_cards : data.cards.conversion[card_count].converted_cards
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
                if (data.cards.conversion[card_count].params.bonus_cur >= (data.routes.back[route_count].price_miles * people_count) && data.cards.conversion[card_count].card.airline_iata === data.routes.back[route_count].airline_iata) {

                    // добавление записи
                    data.routes_cost.conversion.back.push({
                        card: data.cards.conversion[card_count].card.name,
                        card_id: Number(data.cards.conversion[card_count].card.id),
                        airline: data.routes.back[route_count].name,
                        from: data.routes.back[route_count].source,
                        to: data.routes.back[route_count].destination,
                        fee1: Number(data.cards.conversion[card_count].card.fee1),
                        amount: Number(data.cards.conversion[card_count].card.amount),
                        mile: Number(data.routes.back[route_count].price_miles ? Number(data.routes.back[route_count].price_miles) : Number(data.routes.back[route_count].miles)) * people_count,
                        tickets_direct: 0,
                        tickets_back: Number(people_count),
                        link: data.cards.conversion[card_count].card.link,
                        image: data.cards.conversion[card_count].card.image,
                        have: data.cards.conversion[card_count].card.have,
                        conversion: true,
                        
                        params: data.cards.conversion[card_count].params,
                        
                        converted_cards : data.cards.conversion[card_count].converted_cards
                        
                    });
                }
            }

        }

        if (card_count === data.cards.conversion.length - 1) {
            callback();
        }
    }

    if (data.cards.conversion.length === 0) {
        callback();
    }
};

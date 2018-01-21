/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, window, showPageOthers*/

$(document).ready(function () {

    'use strict';

    // обработчик нажатия кнопки для возврата на предыдущую страницу
    $("#loaded").off("click", "#computation-button_goto_back").on("click", "#computation-button_goto_back", function () {

        // проверка соответствие обработчика со страницей
        if (window.identifier === "computation") { showPageOthers(); }

    });
    
    // обработчик нажатия на кнопку применения новой цены для одного билета в прямую сторону
    $("#loaded").off("click", "#direct_variants #computation-button_set_price").on("click", "#direct_variants #computation-button_set_price", function () {
        
            // текущий элемент
        var element = this,
        
            // получение идентификатора варианта
            variant = Number($(element).closest("div[variant]").attr("variant").trim()),
            
            // получение идентификатора карты, с которой произошли изменения
            card = Number($(element).closest("div[card]").attr("card").trim()),
            
            // получение названия авиалинии карты, с которой произошли изменения
            airline = String($(element).closest("div[card]").find("#airline").text().trim()),
            
            // получение значения цены в милях, установленного пользователем
            price_of_one_ticket = Number($(element).closest("div[card]").find("#price_of_one_ticket").val().trim()),
            
            // функция возврата количества бонусов, которые остались доступны на карте после оплаты с карты поездки в другую сторону
            getRemainingBonuses = function (current_card, array) {
                
                // счётчик
                var bonuses_used = 0;
                
                array.forEach(function (card) {
                    
                    if (Number(current_card.card_id) === Number(card.card_id)) {
                        
                        bonuses_used += Number(Number(Number(card.tickets) * Number(card.price_of_one_ticket)));
                        
                    }
                    
                });
                
                return Number(Number(Number(current_card.params.bonus_cur) - Number(bonuses_used)) >= 0 ? Number(Number(current_card.params.bonus_cur) - Number(bonuses_used)) : 0);
                
            },
            
            // функция возврата количества человек, которые летят в одну сторону
            getNumberOfTickets = function (array) {
                
                // счётчик
                var tickets = 0;
                
                array.forEach(function (card) { tickets += Number(card.tickets); });
                
                return Number(tickets);
                
            };
        
        
        // обнуление информационных данных
        window.data.modified_results.computation[Number(variant)].direct.info.total_ticket_price_in_miles = 0;
        window.data.modified_results.computation[Number(variant)].direct.info.total_miles_available_on_all_cards = 0;
        window.data.modified_results.computation[Number(variant)].back.info.total_ticket_price_in_miles = 0;
        window.data.modified_results.computation[Number(variant)].back.info.total_miles_available_on_all_cards = 0;
        
        // изменение данных в массиве вычисленных данных прямого рейса
        window.data.modified_results.computation[Number(variant)].direct.variants.forEach(function (card_computation, count) {
                
            if (String(card_computation.airline) === String(airline)) {

                // вычисление данных
                card_computation.price_of_one_ticket = Number(price_of_one_ticket);
                card_computation.tickets = Math.floor(Number(Number(getRemainingBonuses(card_computation, window.data.modified_results.computation[Number(variant)].back.variants)) / Number(price_of_one_ticket)));
                
            }
            
            window.data.modified_results.computation[Number(variant)].direct.info.total_ticket_price_in_miles += Number(Number(card_computation.price_of_one_ticket) * Number(card_computation.tickets));
            window.data.modified_results.computation[Number(variant)].direct.info.total_miles_available_on_all_cards += Number(card_computation.params.bonus_cur);

                
        });
            
        // изменение данных в массиве вычисленных данных обратного рейса
        window.data.modified_results.computation[Number(variant)].back.variants.forEach(function (card_computation, count) {
            
            window.data.modified_results.computation[Number(variant)].back.info.total_ticket_price_in_miles += Number(Number(card_computation.price_of_one_ticket) * Number(card_computation.tickets));
            window.data.modified_results.computation[Number(variant)].back.info.total_miles_available_on_all_cards += Number(getRemainingBonuses(card_computation, window.data.modified_results.computation[Number(variant)].direct.variants));
                
        });
        
        // перезапись данных на странице для прямого рейса
        window.data.modified_results.computation[Number(variant)].direct.variants.forEach(function (card_computation) {
            
            $(element).closest("div[variant]").children("#direct_variants").find("div[card='" + String(card_computation.card_id) + "']").each(function (count, card) {
                
                if (String($(card).find("#airline").text().trim()) === String(card_computation.airline)) {
                    
                    $(card).closest("div[card]").find("#price_of_one_ticket").val(Number(card_computation.price_of_one_ticket));
                    
                    $(card).closest("div[card]").find("#number_of_tickets").text(Number(card_computation.tickets));
                    
                    $(card).closest("div[variant]").children("#direct_info").find("#price_miles").text(Number(window.data.modified_results.computation[Number(variant)].direct.info.total_ticket_price_in_miles));
                    $(card).closest("div[variant]").children("#direct_info").find("#available_miles").text(Number(window.data.modified_results.computation[Number(variant)].direct.info.total_miles_available_on_all_cards));
                    
                }
                
            });
                
        });
        
        // перезапись данных на странице для обратного рейса
        window.data.modified_results.computation[Number(variant)].back.variants.forEach(function (card_computation) {
            
            $(element).closest("div[variant]").children("#back_variants").find("div[card='" + String(card_computation.card_id) + "']").each(function (count, card) {
                
                if (String($(card).find("#airline").text().trim()) === String(card_computation.airline)) {
                    
                    $(card).closest("div[card]").find("#price_of_one_ticket").val(Number(card_computation.price_of_one_ticket));
                    
                    $(card).closest("div[card]").find("#number_of_tickets").text(Number(card_computation.tickets));
                    $(card).closest("div[variant]").children("#back_info").find("#price_miles").text(Number(window.data.modified_results.computation[Number(variant)].back.info.total_ticket_price_in_miles));
                    $(card).closest("div[variant]").children("#back_info").find("#available_miles").text(Number(window.data.modified_results.computation[Number(variant)].back.info.total_miles_available_on_all_cards));
                    
                }
                
            });
                
        });
        
        // проверка на равенство количества человек, которые летят в обе стороны
        if (Number(getNumberOfTickets(window.data.modified_results.computation[Number(variant)].direct.variants)) !== Number(getNumberOfTickets(window.data.modified_results.computation[Number(variant)].back.variants))) {
            
            // показ уведомления
            $(element).closest("div[variant]").children("#computation-info_warning_block").show();
            $(element).closest("div[variant]").children("#computation-info_warning_block").children("#computation-info_warning").show();
            
        } else {
            
            // скрытие уведомления
            $(element).closest("div[variant]").children("#computation-info_warning_block").hide();
            $(element).closest("div[variant]").children("#computation-info_warning_block").children("#computation-info_warning").hide();
            
        }
        
    });
    
    // обработчик нажатия на кнопку применения новой цены для одного билета в обратную сторону
    $("#loaded").off("click", "#back_variants #computation-button_set_price").on("click", "#back_variants #computation-button_set_price", function () {
        
            // текущий элемент
        var element = this,
        
            // получение идентификатора варианта
            variant = Number($(element).closest("div[variant]").attr("variant").trim()),
            
            // получение идентификатора карты, с которой произошли изменения
            card = Number($(element).closest("div[card]").attr("card").trim()),
            
            // получение названия авиалинии карты, с которой произошли изменения
            airline = String($(element).closest("div[card]").find("#airline").text().trim()),
            
            // получение значения цены в милях, установленного пользователем
            price_of_one_ticket = Number($(element).closest("div[card]").find("#price_of_one_ticket").val().trim()),
            
            // функция возврата количества бонусов, которые остались доступны на карте после оплаты с карты поездки в другую сторону
            getRemainingBonuses = function (current_card, array) {
                
                // счётчик
                var bonuses_used = 0;
                
                array.forEach(function (card) {
                    
                    if (Number(current_card.card_id) === Number(card.card_id)) {
                        
                        bonuses_used += Number(Number(Number(card.tickets) * Number(card.price_of_one_ticket)));
                        
                    }
                    
                });
                
                return Number(Number(Number(current_card.params.bonus_cur) - Number(bonuses_used)) >= 0 ? Number(Number(current_card.params.bonus_cur) - Number(bonuses_used)) : 0);
                
            },
            
            // функция возврата количества человек, которые летят в одну сторону
            getNumberOfTickets = function (array) {
                
                // счётчик
                var tickets = 0;
                
                array.forEach(function (card) { tickets += Number(card.tickets); });
                
                return Number(tickets);
                
            };
        
        
        // обнуление информационных данных
        window.data.modified_results.computation[Number(variant)].direct.info.total_ticket_price_in_miles = 0;
        window.data.modified_results.computation[Number(variant)].direct.info.total_miles_available_on_all_cards = 0;
        window.data.modified_results.computation[Number(variant)].back.info.total_ticket_price_in_miles = 0;
        window.data.modified_results.computation[Number(variant)].back.info.total_miles_available_on_all_cards = 0;
        
        // изменение данных в массиве вычисленных данных прямого рейса
        window.data.modified_results.computation[Number(variant)].direct.variants.forEach(function (card_computation, count) {
            
            window.data.modified_results.computation[Number(variant)].direct.info.total_ticket_price_in_miles += Number(Number(card_computation.price_of_one_ticket) * Number(card_computation.tickets));
            window.data.modified_results.computation[Number(variant)].direct.info.total_miles_available_on_all_cards += Number(card_computation.params.bonus_cur);

                
        });
            
        // изменение данных в массиве вычисленных данных обратного рейса
        window.data.modified_results.computation[Number(variant)].back.variants.forEach(function (card_computation, count) {
                
            if (String(card_computation.airline) === String(airline)) {

                // вычисление данных
                card_computation.price_of_one_ticket = Number(price_of_one_ticket);
                card_computation.tickets = Math.floor(Number(Number(getRemainingBonuses(card_computation, window.data.modified_results.computation[Number(variant)].direct.variants)) / Number(price_of_one_ticket)));

            }
            
            window.data.modified_results.computation[Number(variant)].back.info.total_ticket_price_in_miles += Number(Number(card_computation.price_of_one_ticket) * Number(card_computation.tickets));
            window.data.modified_results.computation[Number(variant)].back.info.total_miles_available_on_all_cards += Number(getRemainingBonuses(card_computation, window.data.modified_results.computation[Number(variant)].direct.variants));
                
        });
        
        // перезапись данных на странице для прямого рейса
        window.data.modified_results.computation[Number(variant)].direct.variants.forEach(function (card_computation) {
            
            $(element).closest("div[variant]").children("#direct_variants").find("div[card='" + String(card_computation.card_id) + "']").each(function (count, card) {
                
                if (String($(card).find("#airline").text().trim()) === String(card_computation.airline)) {
                    
                    $(card).closest("div[card]").find("#price_of_one_ticket").val(Number(card_computation.price_of_one_ticket));
                    
                    $(card).closest("div[card]").find("#number_of_tickets").text(Number(card_computation.tickets));
                    
                    $(card).closest("div[variant]").children("#direct_info").find("#price_miles").text(Number(window.data.modified_results.computation[Number(variant)].direct.info.total_ticket_price_in_miles));
                    $(card).closest("div[variant]").children("#direct_info").find("#available_miles").text(Number(window.data.modified_results.computation[Number(variant)].direct.info.total_miles_available_on_all_cards));
                    
                }
                
            });
                
        });
        
        // перезапись данных на странице для обратного рейса
        window.data.modified_results.computation[Number(variant)].back.variants.forEach(function (card_computation) {
            
            $(element).closest("div[variant]").children("#back_variants").find("div[card='" + String(card_computation.card_id) + "']").each(function (count, card) {
                
                if (String($(card).find("#airline").text().trim()) === String(card_computation.airline)) {
                    
                    $(card).closest("div[card]").find("#price_of_one_ticket").val(Number(card_computation.price_of_one_ticket));
                    
                    $(card).closest("div[card]").find("#number_of_tickets").text(Number(card_computation.tickets));
                    $(card).closest("div[variant]").children("#back_info").find("#price_miles").text(Number(window.data.modified_results.computation[Number(variant)].back.info.total_ticket_price_in_miles));
                    $(card).closest("div[variant]").children("#back_info").find("#available_miles").text(Number(window.data.modified_results.computation[Number(variant)].back.info.total_miles_available_on_all_cards));
                    
                }
                
            });
                
        });
        
        // проверка на равенство количества человек, которые летят в обе стороны
        if (Number(getNumberOfTickets(window.data.modified_results.computation[Number(variant)].direct.variants)) !== Number(getNumberOfTickets(window.data.modified_results.computation[Number(variant)].back.variants))) {
            
            // показ уведомления
            $(element).closest("div[variant]").children("#computation-info_warning_block").show();
            $(element).closest("div[variant]").children("#computation-info_warning_block").children("#computation-info_warning").show();
            
        } else {
            
            // скрытие уведомления
            $(element).closest("div[variant]").children("#computation-info_warning_block").hide();
            $(element).closest("div[variant]").children("#computation-info_warning_block").children("#computation-info_warning").hide();
            
        }
        
    });

});
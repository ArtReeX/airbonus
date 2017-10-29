/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document*/

$(document).ready(function () {

    'use strict';
    
    // скрываем по умолчанию уведомления
    $("#cardsAmEx-info_warning_block, #cardsAmEx-info_warning, #cardsAmEx-info_danger_block, #cardsAmEx-info_danger").hide();
    
    // запрос от сервера списка всех карты American Express
    window.socket.emit("cards_get_amEx");
    
});

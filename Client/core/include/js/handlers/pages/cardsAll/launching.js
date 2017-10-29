/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document*/

$(document).ready(function () {

    'use strict';
    
    // скрываем по умолчанию уведомления
    $("#cardsAll-info_warning_block, #cardsAll-info_warning, #cardsAll-info_danger_block, #cardsAll-info_danger").hide();
    
    // запрос от сервера списка всех карт
    window.socket.emit("cards_get_all");
    
});

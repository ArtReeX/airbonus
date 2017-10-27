/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document*/

$(document).ready(function () {

    'use strict';
    
    // скрываем по умолчанию уведомления
    $("#incomes-info_warning_block, #incomes-info_warning, #incomes-info_danger_block, #incomes-info_danger").hide();
    
    // запрос от сервера списка кредитных рейтингов
    window.socket.emit("incomes_get");
    
});

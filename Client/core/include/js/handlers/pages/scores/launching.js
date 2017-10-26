/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document*/

$(document).ready(function () {

    'use strict';
    
    // скрываем по умолчанию уведомления
    $("#scores-info_warning_block, #scores-info_warning, #scores-info_danger_block, #scores-info_danger").hide();
    
    // запрос от сервера списка кредитных рейтингов
    window.socket.emit("scores_get");
    
});

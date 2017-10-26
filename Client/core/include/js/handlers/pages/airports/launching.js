/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document*/

$(document).ready(function () {

    'use strict';
    
    // скрываем по умолчанию подсказки для полей ввода
    $("#airports-from_tips, #airports-to_tips").hide();
    
    // скрываем по умолчанию уведомления
    $("#airports-info_warning_block, #airports-info_warning, #airports-info_danger_block, #airports-info_danger").hide();
    
});

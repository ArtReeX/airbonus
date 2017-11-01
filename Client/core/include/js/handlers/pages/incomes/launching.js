/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document*/

$(document).ready(function () {

    'use strict';
    
    // запрос от сервера списка кредитных рейтингов
    window.socket.emit("incomes_get");
    
});

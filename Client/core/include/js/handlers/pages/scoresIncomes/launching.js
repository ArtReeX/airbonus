/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document*/

$(document).ready(function () {

    'use strict';
    
    // запрос от сервера списка всех доступных авиалиний
    window.socket.emit("getCreditScores");
    window.socket.emit("getCreditIncomes");
    
});

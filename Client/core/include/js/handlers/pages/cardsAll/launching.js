/************************ ОБРАБОТЧИКИ ЗАПУСКА ************************/
/*globals $, document*/

$(document).ready(function () {

    'use strict';
    
    // запрос от сервера списка всех карт
    window.socket.emit("cards_get_all");
    
});

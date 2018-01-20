/************************ ЗАПУСКАЕМЫЕ СКРИПТЫ ************************/
/*globals $, document, window, io, showPageAirports, showPageError*/

$(document).ready(function () {
    
    'use strict';
    
    // создание структуры
    window.data = {
        
        computation_results: null,
        modified_results: null
        
    };
    
    // показ основной страницы
    showPageAirports();

});
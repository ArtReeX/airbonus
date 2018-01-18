/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document, showPageAirports*/

$(document).ready(function () {

    'use strict';

    // обработчик нажатия на заголовок карточки
    $("#loaded").off("click", ".card-header").on("click", ".card-header", function () {
        
        if ($($(this).parent()).find(".card-body").is(':hidden')) {
            
            $($(this).parent()).find(".card-body").show();
            
        } else {
            
            $($(this).parent()).find(".card-body").hide();
            
        }
        
    });
    
    // обработчик нажатия на логотип страницы
    $("#loaded").off("click", ".logo").on("click", ".logo", function () {
        
        if (window.identifier !== "airports") {
        
            showPageAirports();
            
        }
        
    });

});
/************************ ОБРАБОТЧИКИ ИНТЕРФЕЙСА ************************/
/*globals $, document*/

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

});
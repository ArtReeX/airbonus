/*----------- ЗАГОЛОВКИ -----------*/
/*global require*/
var log_module = require('../log');


/*----------------- LOG ------------------*/
var log = log_module.Log();


/*----------------------------------------*/
// ОБРАБОТЧИК ЗАПРОСА ВСЕХ КАРТ
function getAllCards(sql, name_db, callback) {
    'use strict';

    // обращение к БД

    // основная часть
    sql.request().query("SELECT id,name,image FROM " + name_db + ".cards ORDER BY name", function (error, rows) {

        if (error) {
            log.debug("Error MySQL connection: " + error);
        } else {
            callback(rows.recordset);
        }
        
    });

}


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports = getAllCards;

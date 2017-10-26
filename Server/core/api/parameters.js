/*global require, module*/

/*----------- ЗАГОЛОВКИ -----------*/
var io_module = require("socket.io");

/*-------------------------- ПАРАМЕТРЫ КЛИЕНТА -----------------------------*/
module.exports = {
    
    "userAirportTo": null,
    "userAirportFrom": null,
    "creditScoreMin": null,
    "creditScoreMax": null,
    "incomeMin": null,
    "incomeMax": null,
    "allCards": null,
    "amExCards": null,
    "statusValue": null,
    "minPeople": null,
    "maxPeople": null,
    "spendNextMonth": null,
    "spendNextYear": null,
    
    "consts": {
    
        "incomeMin": null,
        "creditMin": null
        
    }
    
};
/*global require*/

/*-------------- ЗАГОЛОВКИ ------------------*/
var async_module = require("async"),
    
    config_module = require("./config"),
    log_module = require("./core/log"),
    database_module = require("./core/database"),
    service_module = require("./core/services"),
    express_module = require("./core/express"),
    websocket_module = require("./core/websocket"),
    api_module = require("./core/api");


/*-------------- ПЕРЕМЕННЫЕ ------------------*/
var log, database, app, websocket;



/*-------------- MYSQL ------------------*/
async_module.series([
    
    // лог
    function (done) {
        
        "use strict";
        
        log_module.create(config_module.log, function (error, logger) {
            
            if (error) { done(error); } else {
                log = logger;
                done();
            }
            
        });
        
    },
    
    // база данных
    function (done) {
        
        "use strict";
        
        database_module.create(config_module.database, log, function (error, database_client) {
            
            if (error) { done(error); } else {
                database = database_client;
                done();
            }
            
        });
        
    },
    
    // проверка и восстановление базы данных
    function (done) {
        
        "use strict";
        
        service_module.database.restoring(database, async_module, function (error) {
            
            if (error) { done(error); } else { done(); }
            
        });
        
    },
    
    // создание сервера
    function (done) {
        
        "use strict";
        
        express_module.create(config_module.server, function (error, app_server) {
            
            if (error) { done(error); } else {
                app = app_server;
                done();
            }
            
        });
        
    },
    
    // подключение WEB-сокетов
    function (done) {
        
        "use strict";
        
        websocket_module.create(config_module.websocket, app, function (error, websocket_server) {
            
            if (error) { done(error); } else {
                websocket = websocket_server;
                done();
            }
            
        });
        
    },
    
    // установка обработчиков
    function (done) {
        
        "use strict";
        
        api_module.set(config_module.calculate, websocket, database, log, async_module, function (error) {
            
            if (error) { done(error); } else { done(); }
            
        });
        
    }
    
], function (error) {
    
    "use strict";
    
    if (error) {
        log.error(error);
        log.error("Не удалось запустить сервер.");
    } else { log.info("Сервер успешно запущен."); }
    
});
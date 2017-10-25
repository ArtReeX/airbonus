/*globals require, module*/

/*----------- ЗАГОЛОВКИ -----------*/
var log4js_module = require("log4js");


/*---------------------------- LOG -------------------------------*/
module.exports.create = function (config, callback) {
    
    "use strict";

    // задание параметров логирования
    log4js_module.configure(

        {
            "appenders": {

                "console": {
                    type: "console"
                },

                "cheeseLogs": {
                    "type": "file",
                    "filename": config.file,
                    "maxLogSize": config.file_size,
                    "backups": config.file_backup
                }

            },

            categories: {

                "cheese": {
                    "appenders": ["cheeseLogs"],
                    "level": config.level
                },

                "another": {
                    "appenders": ["console"],
                    "level": config.level
                },

                "default": {
                    "appenders": ["console", "cheeseLogs"],
                    "level": config.level
                }

            }

        }
    );

    // создание логгера
    var logger = log4js_module.getLogger();
    
    // вызов callback-функции
    callback(null, logger);
    
};
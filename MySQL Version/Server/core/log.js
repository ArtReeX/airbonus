/*----------- ЗАГОЛОВКИ -----------*/
/*globals require*/
var config_module = require('../config');
var log4js_module = require('log4js');


/*---------------------------- LOG -------------------------------*/
var Log = function () {
    'use strict';

	// задание параметров логирования
	log4js_module.configure({ "appenders" : [{  type : "console" },
            { "type" : "file",
                "filename" : config_module.log.file,
                "maxLogSize" : config_module.log.file_size,
                "backups" : config_module.log.file_backup
            }
        ]});

	// создание логера
	var logger = log4js_module.getLogger();

	// задание уровня логирования
	logger.setLevel(config_module.log.level);

	return logger;
};


/*-------------- ЭКСПОРТ ------------------*/
/*globals module */
module.exports.Log = Log;

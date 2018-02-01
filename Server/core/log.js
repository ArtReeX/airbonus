/* ЛОГГЕР */

const log4js = require("log4js");

module.exports.create = async config => {
    log4js.configure({
        appenders: {
            console: {
                type: "console"
            },

            cheeseLogs: {
                type: "file",
                filename: config.file,
                maxLogSize: config.file_size,
                backups: config.file_backup
            }
        },

        categories: {
            cheese: {
                appenders: ["cheeseLogs"],
                level: config.level
            },

            another: {
                appenders: ["console"],
                level: config.level
            },

            default: {
                appenders: ["console", "cheeseLogs"],
                level: config.level
            }
        }
    });

    return log4js.getLogger();
};

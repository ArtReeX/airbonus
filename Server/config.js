/*-------------- ПАРАМЕТРЫ ------------------*/
var config = {
    // параметры MySQL
    database: {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database: "pilot"
    },

    // параметры сервера
    server: {
        port: "8181",

        files_directory: "./files"
    },

    /* ПАРАМЕТРЫ ЛОГГИРОВАНИЯ
    Уровень логирования (TRACE | DEBUG | INFO | WARN | ERROR | FATAL)
    FATAL   - ошибки приводящие к невозможности работы приложения
    ERROR   - ошибки, но приложение может продолжать работу
    WARN    - предупреждения о возможных проблемах и ошибках
    INFO    - информация о нормальном ходе выполненияи программы, которую нужно знать пользователю
    DEBUG   - информация о нормальном ходе выполненияи программы, предназначенная для разработчиков
    TRACE   - несущественная информация для глубокой отладки
    */

    // параметры логирования
    log: {
        level: "TRACE",
        file: "./logs/log.txt",
        file_size: 1000000,
        file_backup: 20
    },

    // параметры WEB-сокетов
    websocket: {
        // мс
        pingTimeout: 300000,
        // мс
        pingInterval: 300000
    },

    // параметры вычисления данных
    calculate: {
        // определение максимальной глубины рекурсии рассчёта вариантов (максимальная комбинация основных карт)
        recursion_depth_computation: 3,

        // определение максимального количества найденых вариантов комбинаций карт, после которых останавливается поиск
        max_variants_recursion_computation: 50,

        // определение максимальной глубины рекурсии рассчёта преобразований бонусов на картах (максимальное количество карт преобразованных в одну)
        recursion_depth_conversion: 3,

        // определение максимального количества найденых вариантов преобразованых карт, после которых останавливается поиск
        max_variants_recursion_conversion: 100,

        // количество вариантов для отдачи
        max_variants: 3
    }
};

/*-------------- ЭКСПОРТ ------------------*/
/*globals module*/
module.exports = config;

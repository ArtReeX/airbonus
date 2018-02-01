/* ОСНОВНЫЕ ОБРАБОТЧИКИ */

let handlers_module = require("./general/handlers"),
    methods_module = require("./general/methods");

/*---------------------------- ОСНОВНЫЕ ОБРАБОТЧИКИ -------------------------------*/
module.exports.set = async (config, socket, database, log, async) => {
    // получение констант
    await (async () => {
        try {
            socket.session.consts.twoStageSorting = await methods_module.consts.twoStageSorting(
                database
            );
            socket.session.consts.creditMin = await methods_module.consts.creditMin(
                database
            );
            socket.session.consts.incomeMin = await methods_module.consts.incomeMin(
                database
            );
            config.recursion_depth_computation = await methods_module.consts.recursionDepthComputation(
                database
            );
            config.max_variants_recursion_computation = await methods_module.consts.maxVariantsRecursionComputation(
                database
            );
            config.recursion_depth_conversion = await methods_module.consts.recursionDepthConversion(
                database
            );
            config.max_variants_recursion_conversion = await methods_module.consts.maxVariantsRecursionConversion(
                database
            );
            config.max_variants = await methods_module.consts.maxVariants(
                database
            );
        } catch (error) {
            log.error(
                "Не удалось загрузить константы для пользователя " +
                    socket.id +
                    ". " +
                    error
            );
        }
    })();

    // запрос начальных аэропортов
    socket.on("airports_get_from", function(line) {
        handlers_module.airports.getFrom(
            socket,
            {
                line: String(line)
            },
            methods_module,
            database,
            log
        );
    });

    // запрос конечных аэропортов
    socket.on("airports_get_to", function(line) {
        handlers_module.airports.getTo(
            socket,
            {
                line: String(line)
            },
            methods_module,
            database,
            log
        );
    });

    // установка начального и конечного аэропорта
    socket.on("airports_set", function(from, to) {
        handlers_module.airports.set(
            socket,
            {
                from: String(from),
                to: String(to)
            },
            methods_module,
            database,
            log
        );
    });

    // запрос авиалиний
    socket.on("airlines_get", function() {
        handlers_module.airlines.get(socket, methods_module, database, log);
    });

    // запрос кредитного рейтинга
    socket.on("scores_get", function() {
        handlers_module.scores.get(socket, methods_module, database, log);
    });

    // установка кредитного рейтинга
    socket.on("scores_set", function(id) {
        handlers_module.scores.set(
            socket,
            { id: Number(id) },
            methods_module,
            database,
            log
        );
    });

    // запрос дохода
    socket.on("incomes_get", function() {
        handlers_module.incomes.get(socket, methods_module, database, log);
    });

    // установка дохода
    socket.on("incomes_set", function(id) {
        handlers_module.incomes.set(
            socket,
            { id: Number(id) },
            methods_module,
            database,
            log
        );
    });

    // запрос всех карт
    socket.on("cards_get_all", function() {
        handlers_module.cards.getAll(socket, methods_module, database, log);
    });

    // установка количества карт
    socket.on("cards_set_all", function(cards) {
        handlers_module.cards.setAll(
            socket,
            { cards: cards },
            methods_module,
            log
        );
    });

    // запрос всех карт AmericanExpress
    socket.on("cards_get_amEx", function() {
        handlers_module.cards.getAmEx(socket, methods_module, database, log);
    });

    // установка карт AmericanExpress
    socket.on("cards_set_amEx", function(cards) {
        handlers_module.cards.setAmEx(
            socket,
            { cards: cards },
            methods_module,
            log
        );
    });

    // запрос дополнительных данных
    socket.on("others_get", function() {
        handlers_module.others.get(socket, methods_module, database, log);
    });

    // установка дополнительных данных
    socket.on("others_set", function(params) {
        handlers_module.others.set(
            socket,
            { params: params },
            methods_module,
            log
        );
    });

    // запрос расчитаных данных
    socket.on("computation_get", function() {
        handlers_module.computation.get(
            socket,
            config,
            methods_module,
            database,
            log,
            async
        );
    });
};

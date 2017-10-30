/*globals module*/

/*---------------------------- ОБРАБОТЧИК ДЛЯ API -------------------------------*/
module.exports.get = function (socket, config, methods, database, log, async) {
    
    "use strict";
    
    // запись сообщения клиента в отладку
    log.info("Пользователь " + socket.id + " вызвал метод computation_get.");
    
    methods.computation.get(config, socket.session, database, log, async, function (result_error, result_data) {
        
        // переменные для хранения
        var message,
            cards_count,
            variant_count_one,
            variant_count_two;
        
        // изменение количества отдаваемых результатов
        if (result_data.length > 5) { result_data.length = 5; }
        
        // изменение названия повторяющихся карт
        for (cards_count = 0; cards_count < result_data.length; cards_count += 1) {
            
            for (variant_count_one = 0; variant_count_one < result_data[cards_count].variant.length; variant_count_one += 1) {
            
                for (variant_count_two = variant_count_one + 1; variant_count_two < result_data[cards_count].variant.length; variant_count_two += 1) {
            
                    if (result_data[cards_count].variant[variant_count_two].card === result_data[cards_count].variant[variant_count_one].card) {
                        
                        result_data[cards_count].variant[variant_count_two].card = result_data[cards_count].variant[variant_count_two].card + " (Same card)";
                        
                    }
            
                }
            
            }
            
        }
        
        // формирование пакета для отправки
        message = {
            "error": result_error ? { "type": result_error } : null,
            "data": { "computation": result_data }
        };
        
        // отправка результата
        log.trace("Отправка результата computation_get методом computation_get пользователю " + socket.id + ":");
        log.trace(message);

        socket.emit("computation_get", message);

    });
    
};
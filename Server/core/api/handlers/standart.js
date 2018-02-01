/* СТАНДАРТНЫЕ ОБРАБОТЧИКИ */

module.exports.set = async (socket, log) => {
    // отключение клиента
    socket.on("disconnect", function() {
        // логгирование
        log.info("Пользователь " + socket.id + " отключился.");
    });
};

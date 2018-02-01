/* ОБРАБОТЧИКИ ЗАПУСКА */

$(document).ready(() => {
    // запрос от сервера списка всех доступных авиалиний
    window.socket.emit("airlines_get");
});

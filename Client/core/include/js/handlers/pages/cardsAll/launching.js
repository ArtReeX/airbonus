/* ОБРАБОТЧИКИ ЗАПУСКА */

$(document).ready(() => {
    // запрос от сервера списка всех карт
    window.socket.emit("cards_get_all");
});

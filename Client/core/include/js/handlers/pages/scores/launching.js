/* ОБРАБОТЧИКИ ЗАПУСКА */

$(document).ready(() => {
    // запрос от сервера списка кредитных рейтингов
    window.socket.emit("scores_get");
});

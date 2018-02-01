/* ОБРАБОТЧИКИ ЗАПУСКА */

$(document).ready(() => {
    // запрос от сервера списка кредитных рейтингов
    window.socket.emit("incomes_get");
});

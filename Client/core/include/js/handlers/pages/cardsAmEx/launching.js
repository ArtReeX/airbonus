/*ОБРАБОТЧИКИ ЗАПУСКА */

$(document).ready(() => {
    // запрос от сервера списка всех карты American Express
    window.socket.emit("cards_get_amEx");
});

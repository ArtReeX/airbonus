/* ОБРАБОТЧИКИ ЗАПУСКА */

$(document).ready(() => {
    // - определение типа ошибки
    if (window.errorType === "connect_server") {
        $("#error-head b").text("Server connection error");
        $("#error-subHead p").text(
            "- you will be redirected to the main page when the connection is restored"
        );

        // действие после восстановления подключения
        window.socket.on("connect", () => {
            // проверка соответствие обработчика со страницей
            if (window.identifier === "error") {
                // выполняем редирект на главную страницу
                showPageAirports();
            }
        });

        return;
    } else if (window.errorType === "page_exist") {
        $("#error-head b").text("Page not found");
        $("#error-subHead p").text(
            "- you will be redirected to the main page after 10 seconds"
        );

        // переподключение через N секунд
        setTimeout(() => {
            showPageAirports();
        }, 10000);

        return;
    } else if (window.errorType === "scripts_exist") {
        $("#error-head b").text("Scripts not found");
        $("#error-subHead p").text(
            "- you will be redirected to the main page after 10 seconds"
        );

        // переподключение через N секунд
        setTimeout(() => {
            showPageAirports();
        }, 10000);

        return;
    }
});

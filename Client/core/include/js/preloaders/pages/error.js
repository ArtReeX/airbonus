/* ПРЕДЗАГРУЗЧИК */

function showPageError(errorType) {
    $(document).ready(() => {
        // показ прелоадера
        showPagePreloader();

        // установка задержки прелоадера
        setTimeout(() => {
            // отправка запроса на получение содержимого страницы
            $.ajax({
                url: "/core/include/php/pages/error.php",

                dataType: "html",

                cache: true,

                async: true,

                success: html => {
                    // идентификация страницы
                    window.identifierPrevious = window.identifier;
                    window.identifier = "error";

                    // установка типа ошибки
                    window.errorType = errorType;

                    // скрытие страницы
                    $("#loaded").hide();

                    // загрузка HTML-содержимого страницы
                    $("#loaded").html(html);

                    // запуск скриптов после окончания загрузки страницы
                    $.getScript(
                        "/core/include/js/handlers/pages/error/launching.js"
                    );

                    // показ страницы
                    $("#loaded").show();
                },

                error: () => {
                    // показ страницы с ошибкой
                    showPageError("page_exist");
                }
            });
        }, 600);
    });
}

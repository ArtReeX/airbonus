/* ПРЕДЗАГРУЗЧИК */

function showPagePreloader(errorType) {
    $(document).ready(() => {
        // отправка запроса на получение содержимого страницы
        $.ajax({
            url: "/core/include/php/pages/preloader.php",

            dataType: "html",

            cache: true,

            async: true,

            success: html => {
                // идентификация страницы
                window.identifierPrevious = window.identifier;
                window.identifier = "preloader";

                // установка типа ошибки
                window.errorType = errorType;

                // скрытие страницы
                $("#loaded").hide();

                // загрузка HTML-содержимого страницы
                $("#loaded").html(html);

                // показ страницы
                $("#loaded").show();
            },

            error: () => {
                // показ страницы с ошибкой
                showPageError("page_exist");
            }
        });
    });
}

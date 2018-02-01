/* ПРЕДЗАГРУЗЧИК */

function showPageAirlines() {
    $(document).ready(() => {
        // показ прелоадера
        showPagePreloader();

        // установка задержки прелоадера
        setTimeout(() => {
            // отправка запроса на получение содержимого страницы
            $.ajax({
                url: "/core/include/php/pages/airlines.php",

                dataType: "html",

                cache: true,

                async: true,

                success: function(html) {
                    // идентификация страницы
                    window.identifierPrevious = window.identifier;
                    window.identifier = "airlines";

                    // скрытие страницы
                    $("#loaded").hide();

                    // загрузка HTML-содержимого страницы
                    $("#loaded").html(html);

                    // запуск скриптов после окончания загрузки страницы
                    $.getScript(
                        "/core/include/js/handlers/pages/airlines/launching.js"
                    ).fail(() => {
                        showPageError("scripts_exist");
                    });

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

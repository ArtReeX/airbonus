/* ПРЕДЗАГРУЗЧИК */

function showPageOthers() {
    $(document).ready(() => {
        // показ прелоадера
        showPagePreloader();

        // установка задержки прелоадера
        setTimeout(() => {
            // отправка запроса на получение содержимого страницы
            $.ajax({
                url: "/core/include/php/pages/others.php",

                dataType: "html",

                cache: true,

                async: true,

                success: html => {
                    // идентификация страницы
                    window.identifierPrevious = window.identifier;
                    window.identifier = "others";

                    // скрытие страницы
                    $("#loaded").hide();

                    // загрузка HTML-содержимого страницы
                    $("#loaded").html(html);

                    // запуск скриптов после окончания загрузки страницы
                    $.getScript(
                        "/core/include/js/handlers/pages/others/launching.js"
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

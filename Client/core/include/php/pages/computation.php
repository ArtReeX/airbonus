<!-- размытый фон -->
<div class="blur-content">

    <!-- содержимое страницы -->
    <div class="container">

        <!-- лого страницы -->
        <div class="row justify-content-center">
            <div id="computation-logo"><img src="/core/include/style/images/basic/main_logo.png"></div>
        </div>

        <!-- заголовок страницы с информацией об отсутствии вариантов -->      
        <div class="row justify-content-center" id="computation-header_empty">

            <div class="col lead text-center">
                <p> Unfortunately, we have no found the cards with bonuses that would make your trip free. Please, check other destination or reduce the minimum number of people for this trip. </p>
            </div>

        </div>
        
        <!-- блок с содержимым таблиц -->      
        <div id="computation-result_tables" style="display: none;"> </div>
        
        <!-- предупреждения -->
        <div class="row justify-content-center" id="computation-info_warning_block" style="display: none;">
            <div class="col-md-8 alert alert-warning text-center" role="alert" id="computation-info_warning" style="display: none;"></div>
        </div>
        
        <div class="row justify-content-center" id="computation-info_danger_block" style="display: none;">
            <div class="col-md-8 alert alert-danger text-center" role="alert" id="computation-info_danger" style="display: none;"></div>
        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-between">
            
            <!-- кнопка возврата на предыдущую страницу -->
            <div class="col-3 col-lg-2 text-primary text-center" id="computation-button_goto_back">
                <i class="fa fa-chevron-circle-left fa-2x" aria-hidden="true"></i>
            </div>
            
        </div>

    </div>

</div>
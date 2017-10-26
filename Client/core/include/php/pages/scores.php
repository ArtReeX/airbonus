<!-- размытый фон -->
<div class="blur-content">

    <!-- содержимое страницы -->
    <div class="container">

        <!-- лого страницы -->
        <div class="row justify-content-center">
            <div id="scores-logo"><img src="/core/include/style/images/basic/main_logo.png"></div>
        </div>

        <!-- заголовок страницы -->
        <div class="row justify-content-center">

            <div class="col display-4 text-center">
                <p><b> Select your credit score </b></p>
            </div>

        </div>
        
        <!-- список доступных к выбору кредитных рейтингов -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-lg-10  text-center">
            
                <div class="form-group">       
                    <select class="form-control" id="scores-list"> </select>
                </div>
                
            </div>

        </div>
        
        <!-- предупреждения -->
        <div class="row justify-content-center" id="scores-info_warning_block">
            <div class="col-md-8 alert alert-warning text-center" role="alert" id="scores-info_warning"></div>
        </div>
        
        <div class="row justify-content-center" id="scores-info_danger_block">
            <div class="col-md-8 alert alert-danger text-center" role="alert" id="scores-info_danger"></div>
        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-between">
            
            <!-- кнопка возврата на предыдущую страницу -->
            <div class="col-1" id="scores-button_goto_back">
                <i class="fa fa-chevron-circle-left fa-2x" aria-hidden="true"></i>
            </div>
            
            <!-- кнопка перехода на следующую страницу -->
            <div class="col-1 ml-auto" id="scores-button_goto_next">
                <i class="fa fa-chevron-circle-right fa-2x" aria-hidden="true"></i>
            </div>
            
        </div>

    </div>

</div>
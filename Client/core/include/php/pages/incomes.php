<!-- размытый фон -->
<div class="blur-content">

    <!-- содержимое страницы -->
    <div class="container">

        <!-- лого страницы -->
        <div class="row justify-content-center">
            <div id="incomes-logo"><img src="/core/include/style/images/basic/main_logo.png"></div>
        </div>

        <!-- заголовок страницы -->
        <div class="row justify-content-center">

            <div class="col h1 text-center">
                <p><b> Select your income </b></p>
            </div>

        </div>
        
        <!-- список доступных к выбору кредитных рейтингов -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-lg-10  text-center">
            
                <div class="form-group">       
                    <select class="form-control" id="incomes-list"> </select>
                </div>
                
            </div>

        </div>
        
        <!-- предупреждения -->
        <div class="row justify-content-center" id="incomes-info_warning_block">
            <div class="col-md-8 alert alert-warning text-center" role="alert" id="incomes-info_warning"></div>
        </div>
        
        <div class="row justify-content-center" id="incomes-info_danger_block">
            <div class="col-md-8 alert alert-danger text-center" role="alert" id="incomes-info_danger"></div>
        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-between">
            
            <!-- кнопка возврата на предыдущую страницу -->
            <div class="col-3 col-lg-2 text-center" id="incomes-button_goto_back">
                <i class="fa fa-chevron-circle-left fa-2x" aria-hidden="true"></i>
            </div>
            
            <!-- кнопка перехода на следующую страницу -->
            <div class="col-3 col-lg-2 ml-auto text-center" id="incomes-button_goto_next">
                <i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>
            </div>
            
        </div>

    </div>

</div>
<!-- размытый фон -->
<div class="blur-content">

    <!-- содержимое страницы -->
    <div class="container">

        <!-- лого страницы -->
        <div class="row justify-content-center">
            <div id="others-logo"><img src="/core/include/style/images/basic/main_logo.png"></div>
        </div>

        <!-- заголовок страницы -->
        <div class="row justify-content-center">

            <div class="col h1 text-center">
                <p><b> Few final questions </b></p>
            </div>

        </div>
        
        <!-- список доступных к выбору семейных положений -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-lg-6 lead text-left"> 
                <p> Your marital status <p> 
            </div>
            
            <div class="col-12 col-lg-2 ml-auto text-right text-center">
            
                <div class="form-group">       
                    <select class="form-control" id="others-statuses_list"> </select>
                </div>
                
            </div>

        </div>
        
        <!-- минимальное количество пассажиров -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-lg-6 lead text-left"> 
                <p> Minimum number of passengers travelling with you including your spouse <p> 
            </div>
            
            <div class="col-12 col-lg-2 ml-auto text-right">
            
                <div class="form-group">       
                    <select class="form-control" id="others-passengers_min"> </select>
                </div>
                
            </div>

        </div>
        
        <!-- максимальное количество пассажиров -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-lg-6 lead text-left"> 
                <p> Maximum number of passengers travelling with you including your spouse <p> 
            </div>
            
            <div class="col-12 col-lg-2 ml-auto text-right">
            
                <div class="form-group">       
                    <select class="form-control" id="others-passengers_max"> </select>
                </div>
                
            </div>

        </div>
        
        <!-- месячная трата -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-lg-6 lead text-left"> 
                <p> Amount you spend monthly <p> 
            </div>
            
            <div class="col-12 col-lg-2 ml-auto text-right"> 
                
                <div class="form-group">
                    <input type="text" class="form-control bg-light text-center text-black" id="others-spend_month">
                </div>
                
            </div>

        </div>
        
        <!-- годовая трата -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-lg-6 lead text-left"> 
                <p> Amount you plan to spend in the next 12 months <p> 
            </div>
            
            <div class="col-12 col-lg-2 ml-auto text-right"> 
                
                <div class="form-group">
                    <input type="text" class="form-control bg-light text-center text-black" id="others-spend_year">
                </div>
                
            </div>

        </div>
        
        <!-- предупреждения -->
        <div class="row justify-content-center" id="others-info_warning_block">
            <div class="col-md-8 alert alert-warning text-center" role="alert" id="others-info_warning"></div>
        </div>
        
        <div class="row justify-content-center" id="others-info_danger_block">
            <div class="col-md-8 alert alert-danger text-center" role="alert" id="others-info_danger"></div>
        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-between">
            
            <!-- кнопка возврата на предыдущую страницу -->
            <div class="col-3 col-lg-2 text-center" id="others-button_goto_back">
                <i class="fa fa-chevron-circle-left fa-2x" aria-hidden="true"></i>
            </div>
            
            <!-- кнопка перехода на следующую страницу -->
            <div class="col-3 col-lg-2 ml-auto text-center" id="others-button_goto_next">
                <i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>
            </div>
            
        </div>

    </div>

</div>
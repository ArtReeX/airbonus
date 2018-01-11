<!-- содержимое страницы -->
<div class="container-fluid h-100 m-0 p-0">

    <!-- верхняя часть страницы -->
    <div class="wrapper container-fluid m-0 p-0 bg-content">
    
        <!-- лого страницы -->
        <?php include("../plugins/logo.php"); ?>

        <!-- заголовок страницы -->
        <div class="row justify-content-center p-4">

            <div class="col-12 col-md-8 col-lg-6 lead text-center text-white" id="computation-header_empty">
                <h3> Unfortunately, we have no found the cards with bonuses that would make your trip free. Please, check other destination or reduce the minimum number of people for this trip. </h3>
            </div>

        </div>
        
        <!-- предзагрузчик -->
        <div class="row justify-content-center p-1">
            
            <div class="col-12 col-md-10 m-0 p-0">
                    
                <div class="row justify-content-center">

                    <div class="col-3 col-md-2 col-lg-1 m-0 p-0">
                        <div id="computation-preloader"><img class="img-fluid" src="/core/include/style/images/basic/loading_circle.gif"></div>
                    </div>

                </div>
                
            </div>
            
        </div>
        
        <!-- статистика -->
        <div class="row justify-content-center p-2" id="computation-statistics">
            
            <div class="col-12 col-md-10 col-lg-8 lead text-center text-white">
                
                <h3> We went through 
                    <span class="badge badge-pill badge-info" id="computation-statistics-combination"></span> 
                    id possible combinations using 
                    <span class="badge badge-pill badge-info" id="computation-statistics-cards"></span> 
                    valid cards...
                </h3> 
   
            </div>
            
            <!-- разделитель -->
            <div class='col-12 col-md-10 col-lg-8 mt-2 mb-2 p-0'><hr class='my-1'></div>

        </div>
        
        <!-- список вычисленных карт карт -->
        <div class="row justify-content-center p-1">
            
            <div class="col-12 col-md-10 m-0 p-0">
                    
                <div class="row justify-content-beetwen">

                    <div class="container-fluid text-white" id="computation-result_tables"></div>

                </div>
                
            </div>
            
        </div>
        
        <!-- предупреждения -->
        <div class="row justify-content-center p-2 hidden" id="airports-info_warning_block">
            <div class="col-12 col-md-8 col-lg-6 alert alert-warning text-center none" role="alert" id="computation-info_warning"></div>
        </div>

        <div class="row justify-content-center p-2 hidden" id="airports-info_danger_block">
            <div class="col-12 col-md-8 col-lg-6 alert alert-danger text-center none" role="alert" id="computation-info_danger"></div>
        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-center p-3">
            <button class="col-4 col-md-2 col-lg-1 btn" id="computation-button_goto_back" ><b> BACK </b></button>
        </div>
    
    </div>
    
    <!-- нижняя часть страницы -->
    <?php include("../plugins/footer.php"); ?>

</div>
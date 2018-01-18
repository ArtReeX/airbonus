<!-- содержимое страницы -->
<div class="container-fluid h-100 m-0 p-0">

    <!-- верхняя часть страницы -->
    <div class="wrapper container-fluid m-0 p-0 bg-content">
    
        <!-- лого страницы -->
        <?php include("../plugins/logo.php"); ?>

        <!-- заголовок страницы -->
        <div class="row justify-content-center p-4">

            <div class="col-12 col-md-8 col-lg-6 lead text-center text-white">
                <h3> Have you EVER had any of the American Express cards? </h3>
            </div>

        </div>
        
        <!-- шаг -->
        <div class="row justify-content-center mt-4 text-center text-white">
            <p> Step 5 of 6 </p>
        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-center m-0 p-0 pb-2 text-center text-white">

            <div class="col-12 col-md-8 col-lg-8">
            
                <div class="container-fluid">
                    
                    <div class="row justify-content-center m-auto text-center">
                        
                        <button class="col-5 col-md-3 col-lg-2 btn text-white" id="cardsAmEx-button_goto_back" ><b> BACK </b></button>
                        
                        <button class="col-5 col-md-3 col-lg-2 ml-auto btn text-white" id="cardsAmEx-button_goto_next" ><b> NEXT </b></button>
                        
                    </div>
                
                </div>
            
            </div>

        </div>
        
        <!-- список доступных к выбору карт -->
        <div class="row justify-content-center p-1">
            
            <div class="col-12 col-md-10 m-0 p-0">
                
                <div class="container-fluid">
                    <div class="row justify-content-beetwen" id="cardsAmEx-table"></div>
                </div>
                
            </div>
            
        </div>
        
        <!-- предупреждения -->
        <div class="row justify-content-center p-2 hidden" id="airports-info_warning_block">
            <div class="col-12 col-md-8 col-lg-6 alert alert-warning text-center none" role="alert" id="cardsAmEx-info_warning"></div>
        </div>

        <div class="row justify-content-center p-2 hidden" id="airports-info_danger_block">
            <div class="col-12 col-md-8 col-lg-6 alert alert-danger text-center none" role="alert" id="cardsAmEx-info_danger"></div>
        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-center m-0 p-0 pb-2 text-center text-white">

            <div class="col-12 col-md-8 col-lg-8">
            
                <div class="container-fluid">
                    
                    <div class="row justify-content-center m-auto text-center">
                        
                        <button class="col-5 col-md-3 col-lg-2 btn text-white" id="cardsAmEx-button_goto_back" ><b> BACK </b></button>
                        
                        <button class="col-5 col-md-3 col-lg-2 ml-auto btn text-white" id="cardsAmEx-button_goto_next" ><b> NEXT </b></button>
                        
                    </div>
                
                </div>
            
            </div>

        </div>
    
    </div>
    
    <!-- нижняя часть страницы -->
    <?php include("../plugins/footer.php"); ?>

</div>
<!-- содержимое страницы -->
<div class="container-fluid h-100 m-0 p-0">

    <!-- верхняя часть страницы -->
    <div class="wrapper container-fluid m-0 p-0 bg-content text-white">
    
        <!-- лого страницы -->
        <?php include("../plugins/logo.php"); ?>

        <!-- заголовок страницы -->
        <div class="row justify-content-center p-4">

            <div class="col-12 col-md-8 col-lg-6 lead text-center text-white">
                <h3> Few final questions. </h3>
            </div>

        </div>
        
        <!-- шаг -->
        <div class="row justify-content-center mt-4 text-center text-white">
            <p> Step 6 of 6 </p>
        </div>
        
        <!-- список доступных к выбору семейных положений -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-md-8">
            
                <div class="container-fluid h-100">
                
                    <div class="row justify-content-center">
                    
                        <div class="col-12 col-lg-6 text-left"> 
                            <p> Your marital status <p> 
                        </div>

                        <div class="col-12 col-lg-3 ml-auto text-right text-center">

                            <div class="form-group">       
                                <select class="form-control hidden" id="others-statuses_list"> </select>
                            </div>

                        </div>
                        
                    </div>
                    
                </div>
                
            </div>

        </div>
        
        <!-- минимальное количество пассажиров -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-md-8">
            
                <div class="container-fluid h-100">
                
                    <div class="row justify-content-center">
            
                        <div class="col-12 col-lg-6 text-left"> 
                            <p> Minimum number of passengers travelling with you including your spouse <p> 
                        </div>

                        <div class="col-12 col-lg-3 ml-auto text-right">

                            <div class="form-group">       
                                <select class="form-control hidden" id="others-passengers_min"> </select>
                            </div>

                        </div>
                    
                    </div>
                
                </div>
                
            </div>

        </div>
        
        <!-- максимальное количество пассажиров -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-md-8">
            
                <div class="container-fluid h-100">
                
                    <div class="row justify-content-center">
            
                        <div class="col-12 col-lg-6 text-left"> 
                            <p> Maximum number of passengers travelling with you including your spouse <p> 
                        </div>

                        <div class="col-12 col-lg-3 ml-auto text-right">

                            <div class="form-group">       
                                <select class="form-control hidden" id="others-passengers_max"> </select>
                            </div>

                        </div>
                    
                    </div>
                
                </div>
                
            </div>

        </div>
        
        <!-- месячная трата -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-md-8">
            
                <div class="container-fluid h-100">
                
                    <div class="row justify-content-center">
            
                        <div class="col-12 col-lg-6 text-left"> 
                            <p> Amount you spend monthly <p> 
                        </div>

                        <div class="col-12 col-lg-3 ml-auto text-right"> 

                            <div class="form-group">
                                <input type="number" class="form-control bg-light text-left text-black" id="others-spend_month">
                            </div>

                        </div>
                    
                    </div>
                
                </div>
                
            </div>

        </div>
        
        <!-- годовая трата -->
        <div class="row justify-content-center">
            
            <div class="col-12 col-md-8">
            
                <div class="container-fluid h-100">
                
                    <div class="row justify-content-center">
            
                        <div class="col-12 col-lg-6 text-left"> 
                            <p> Amount you plan to spend in the next 12 months <p> 
                        </div>

                        <div class="col-12 col-lg-3 ml-auto text-right"> 

                            <div class="form-group">
                                <input type="number" class="form-control bg-light text-left text-black" id="others-spend_year">
                            </div>

                        </div>
                    
                    </div>
                
                </div>
                
            </div>

        </div>
        
        <!-- предупреждения -->
        <div class="row justify-content-center p-2 hidden" id="airports-info_warning_block">
            <div class="col-12 col-md-8 col-lg-6 alert alert-warning text-center none" role="alert" id="others-info_warning"></div>
        </div>

        <div class="row justify-content-center p-2 hidden" id="airports-info_danger_block">
            <div class="col-12 col-md-8 col-lg-6 alert alert-danger text-center none" role="alert" id="others-info_danger"></div>
        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-center m-0 p-0 pb-2 text-center text-white">

            <div class="col-12 col-md-8 col-lg-8">
            
                <div class="container-fluid">
                    
                    <div class="row justify-content-center m-auto text-center">
                        
                        <button class="col-5 col-md-3 col-lg-2 btn text-white" id="others-button_goto_back" ><b> BACK </b></button>
                        
                        <button class="col-5 col-md-3 col-lg-2 ml-auto btn text-white" id="others-button_goto_next" ><b> NEXT </b></button>
                        
                    </div>
                
                </div>
            
            </div>

        </div>
    
    </div>
    
    <!-- нижняя часть страницы -->
    <?php include("../plugins/footer.php"); ?>

</div>
